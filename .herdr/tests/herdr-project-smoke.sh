#!/usr/bin/env bash

set -uo pipefail

SOURCE_ROOT="$(cd "$(dirname "$0")/../.." && pwd -P)"
LAUNCHER_SOURCE="$SOURCE_ROOT/.herdr/bin/herdr-project"
FIXTURE_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/herdr-project-test.XXXXXX")"
FIXTURE_ROOT="$(cd "$FIXTURE_ROOT" && pwd -P)"
FAKE_BIN="$FIXTURE_ROOT/fake-bin"
LOG_FILE="$FIXTURE_ROOT/herdr.log"
PASS_COUNT=0

cleanup() {
  rm -rf "$FIXTURE_ROOT"
}
trap cleanup EXIT

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  printf 'ok %s - %s\n' "$PASS_COUNT" "$1"
}

fail() {
  printf 'not ok %s - %s\n' "$((PASS_COUNT + 1))" "$1" >&2
  exit 1
}

expect_success() {
  local name="$1"
  shift
  "$@" >"$FIXTURE_ROOT/output" 2>&1 || {
    cat "$FIXTURE_ROOT/output" >&2
    fail "$name"
  }
  pass "$name"
}

expect_failure_containing() {
  local name="$1"
  local expected="$2"
  shift 2
  if "$@" >"$FIXTURE_ROOT/output" 2>&1; then
    fail "$name: se esperaba un error"
  fi
  grep -F "$expected" "$FIXTURE_ROOT/output" >/dev/null || {
    cat "$FIXTURE_ROOT/output" >&2
    fail "$name: mensaje inesperado"
  }
  pass "$name"
}

mkdir -p "$FIXTURE_ROOT/.herdr/bin" "$FIXTURE_ROOT/.herdr/prompts" "$FIXTURE_ROOT/.opencode" "$FAKE_BIN"
cp "$LAUNCHER_SOURCE" "$FIXTURE_ROOT/.herdr/bin/herdr-project"
chmod +x "$FIXTURE_ROOT/.herdr/bin/herdr-project"
git -C "$FIXTURE_ROOT" init -q

cat >"$FIXTURE_ROOT/.herdr/session.json" <<'JSON'
{
  "schemaVersion": 1,
  "project": { "name": "fixture", "root": ".." },
  "session": { "name": "default" },
  "defaultPreset": "test",
  "presets": {
    "test": {
      "roles": {
        "dev": {
          "paneLabel": "dev",
          "kind": "opencode",
          "contract": ".herdr/prompts/developer.md",
          "adapter": ".opencode/project-dev.md",
          "adapterScope": "project",
          "launch": {
            "args": ["--agent", "project-dev", "--model", "test/model"]
          }
        }
      }
    }
  }
}
JSON

printf '# Contrato de prueba\n' >"$FIXTURE_ROOT/.herdr/prompts/developer.md"
printf '# Adaptador de prueba\n' >"$FIXTURE_ROOT/.opencode/project-dev.md"

cat >"$FAKE_BIN/herdr" <<'FAKE'
#!/usr/bin/env bash
set -u

case "${1:-} ${2:-}" in
  "agent list")
    printf '{"result":{"agents":[]}}\n'
    ;;
  "pane list")
    case "${FAKE_SCENARIO:-ready}" in
      missing)
        printf '{"result":{"panes":[]}}\n'
        ;;
      duplicate)
        printf '{"result":{"panes":[{"label":"dev","pane_id":"w9:p2","cwd":"%s"},{"label":"dev","pane_id":"w9:p3","cwd":"%s"}]}}\n' "$FAKE_ROOT" "$FAKE_ROOT"
        ;;
      *)
        printf '{"result":{"panes":[{"label":"dev","pane_id":"w9:p2","cwd":"%s"}]}}\n' "$FAKE_ROOT"
        ;;
    esac
    ;;
  "pane process-info")
    if [[ "${FAKE_SCENARIO:-ready}" == "occupied" ]]; then
      printf '{"result":{"process_info":{"shell_pid":100,"foreground_processes":[{"pid":200}]}}}\n'
    else
      printf '{"result":{"process_info":{"shell_pid":100,"foreground_processes":[{"pid":100}]}}}\n'
    fi
    ;;
  "agent start")
    printf '%s\n' "$*" >>"$FAKE_LOG"
    printf '{"result":{"started":true}}\n'
    ;;
  "status server")
    [[ "${FAKE_SCENARIO:-ready}" == "server-running" ]] || exit 1
    printf 'status: running\n'
    ;;
  *)
    printf '%s\n' "$*" >>"$FAKE_LOG"
    ;;
esac
FAKE
chmod +x "$FAKE_BIN/herdr"

run_launcher() {
  env \
    PATH="$FAKE_BIN:$PATH" \
    HERDR_ENV=1 \
    HERDR_WORKSPACE_ID=w9 \
    HERDR_PANE_ID=w9:p1 \
    FAKE_ROOT="$FIXTURE_ROOT" \
    FAKE_LOG="$LOG_FILE" \
    FAKE_SCENARIO="${FAKE_SCENARIO:-ready}" \
    "$FIXTURE_ROOT/.herdr/bin/herdr-project" "$@"
}

cd "$FIXTURE_ROOT" || exit 1

expect_success "valida un panel vacío y etiquetado" run_launcher validate
expect_success "construye start sin mutar en dry-run" run_launcher start --dry-run
grep -F 'herdr agent start dev --kind opencode --pane w9:p2 -- --agent project-dev --model test/model' "$FIXTURE_ROOT/output" >/dev/null ||
  fail "dry-run conserva argumentos y separador --"
pass "dry-run conserva argumentos y separador --"

expect_success "inicia un rol ausente en el fixture" run_launcher start
grep -F 'agent start dev --kind opencode --pane w9:p2 -- --agent project-dev --model test/model' "$LOG_FILE" >/dev/null ||
  fail "start no entregó el comando esperado"
pass "start entrega el comando esperado"

FAKE_SCENARIO=missing expect_failure_containing \
  "rechaza panel ausente antes de start" "no existe un panel etiquetado dev" run_launcher start
FAKE_SCENARIO=duplicate expect_failure_containing \
  "rechaza etiquetas duplicadas" "hay 2 paneles etiquetados dev" run_launcher start
FAKE_SCENARIO=occupied expect_failure_containing \
  "rechaza un panel ocupado" "no está en un prompt de shell disponible" run_launcher start

expect_failure_containing \
  "rechaza control fuera de Herdr" "debe ejecutarse dentro de un panel administrado por Herdr" \
  env -u HERDR_ENV -u HERDR_WORKSPACE_ID -u HERDR_PANE_ID \
    PATH="$FAKE_BIN:$PATH" FAKE_ROOT="$FIXTURE_ROOT" FAKE_LOG="$LOG_FILE" \
    "$FIXTURE_ROOT/.herdr/bin/herdr-project" validate

expect_success \
  "attach ofrece dry-run desde fuera de Herdr" \
  env -u HERDR_ENV -u HERDR_WORKSPACE_ID -u HERDR_PANE_ID \
    PATH="$FAKE_BIN:$PATH" FAKE_ROOT="$FIXTURE_ROOT" FAKE_LOG="$LOG_FILE" \
    "$FIXTURE_ROOT/.herdr/bin/herdr-project" attach --dry-run

FAKE_SCENARIO=server-running expect_success \
  "recover detecta una sesión viva sin recrearla" \
  env -u HERDR_ENV -u HERDR_WORKSPACE_ID -u HERDR_PANE_ID \
    PATH="$FAKE_BIN:$PATH" FAKE_ROOT="$FIXTURE_ROOT" FAKE_LOG="$LOG_FILE" \
    FAKE_SCENARIO=server-running \
    "$FIXTURE_ROOT/.herdr/bin/herdr-project" recover --dry-run

printf '1..%s\n' "$PASS_COUNT"
