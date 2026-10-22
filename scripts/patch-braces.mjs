import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const patch = fileURLToPath(new URL("../patches/braces+3.0.3.patch", import.meta.url));
const manifest = JSON.parse(readFileSync(new URL("../node_modules/braces/package.json", import.meta.url), "utf8"));

if (manifest.version !== "3.0.3") {
  throw new Error(`Revisar el parche de seguridad: se esperaba braces 3.0.3, se encontró ${manifest.version}.`);
}

function gitApply(...options) {
  return spawnSync("git", ["apply", ...options, "--", patch], { cwd: root, encoding: "utf8" });
}

// A second install must retain the fix without applying it twice.
if (gitApply("--reverse", "--check").status === 0) {
  console.log("braces 3.0.3: parche de profundidad ya aplicado.");
} else {
  const check = gitApply("--check");
  if (check.status !== 0) {
    throw new Error(`No se puede aplicar el parche de braces; revisar la instalación. ${check.error?.message ?? check.stderr}`);
  }

  const result = gitApply();
  if (result.status !== 0) {
    throw new Error(`Falló el parche de braces. ${result.error?.message ?? result.stderr}`);
  }
  console.log("braces 3.0.3: parche de profundidad aplicado.");
}
