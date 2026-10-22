import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

// Exercise the actual transitive dependency used by the Next.js ESLint plugin.
const load = createRequire(import.meta.url);
const loadPlugin = createRequire(load.resolve("@next/eslint-plugin-next"));
const loadGlob = createRequire(loadPlugin.resolve("fast-glob"));
const loadMicromatch = createRequire(loadGlob.resolve("micromatch"));
const braces = loadMicromatch("braces");
const depthError = "Pattern nesting depth exceeds maximum of 100";

const fixtureRoots: string[] = [];
const patchedFiles = ["constants.js", "parse.js", "compile.js", "expand.js", "stringify.js"];

function installerFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "mich-braces-patch-test-"));
  fixtureRoots.push(root);
  for (const directory of ["scripts", "patches", "node_modules/braces/lib"]) {
    mkdirSync(path.join(root, directory), { recursive: true });
  }
  for (const file of ["scripts/patch-braces.mjs", "patches/braces+3.0.3.patch"]) {
    copyFileSync(path.resolve(file), path.join(root, file));
  }
  writeFileSync(path.join(root, "node_modules/braces/package.json"), JSON.stringify({ name: "braces", version: "3.0.3" }));
  for (const file of patchedFiles) {
    copyFileSync(path.join(path.dirname(loadMicromatch.resolve("braces")), "lib", file), path.join(root, "node_modules/braces/lib", file));
  }
  return root;
}

function runInstaller(root: string) {
  return spawnSync(process.execPath, [path.join(root, "scripts/patch-braces.mjs")], { encoding: "utf8", timeout: 3000 });
}

afterEach(() => {
  for (const root of fixtureRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("braces security patch", () => {
  it.each(["parse", "compile", "expand", "stringify"])("rejects excessive nesting through %s", (method) => {
    for (const pattern of [
      "{".repeat(101) + "x" + "}".repeat(101),
      "(".repeat(101) + "x" + ")".repeat(101),
      "{(".repeat(51) + "x" + ")}".repeat(51),
      "{".repeat(101) + "x",
    ]) {
      expect(() => braces[method](pattern)).toThrow(depthError);
    }
  });

  it("protects the default API, arrays and expansion mode", () => {
    const pattern = "{".repeat(101) + "x" + "}".repeat(101);
    expect(() => braces(pattern)).toThrow(depthError);
    expect(() => braces(["{a,b}", pattern])).toThrow(depthError);
    expect(() => braces(pattern, { expand: true })).toThrow(depthError);
  });

  it.each(["compile", "expand", "stringify"])("rejects a deeply nested external AST through %s", (method) => {
    let ast: { type: string; nodes?: unknown[]; value?: string } = { type: "text", value: "x" };
    for (let depth = 0; depth < 102; depth += 1) {
      ast = { type: "root", nodes: [ast] };
    }
    expect(() => braces[method](ast)).toThrow(depthError);
  });

  it.each(["compile", "expand"])("rejects the reported stack exhaustion input safely through %s", (method) => {
    const result = spawnSync(process.execPath, ["--stack-size=256", "-e", `
      const braces = require(${JSON.stringify(loadMicromatch.resolve("braces"))});
      const pattern = "{".repeat(4500) + "x" + "}".repeat(4500);
      try {
        braces[${JSON.stringify(method)}](pattern);
        process.exitCode = 1;
      } catch (error) {
        if (!(error instanceof RangeError) || error.message !== ${JSON.stringify(depthError)}) {
          console.error(error.message);
          process.exitCode = 1;
        }
      }
    `], { encoding: "utf8", timeout: 3000 });

    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(result.status, result.stderr).toBe(0);
  });

  it("preserves ordinary patterns, nested alternatives and ranges", () => {
    expect(braces("src/{app,components}/**/*.{ts,tsx}", { expand: true })).toEqual([
      "src/app/**/*.ts", "src/app/**/*.tsx", "src/components/**/*.ts", "src/components/**/*.tsx",
    ]);
    expect(braces.expand("{a,{b,c}}/{1..3}")).toEqual(["a/1", "a/2", "a/3", "b/1", "b/2", "b/3", "c/1", "c/2", "c/3"]);
    expect(braces.compile("a/{b,c}/d")).toBe("a/(b|c)/d");
    expect(braces.stringify(braces.parse("{a,b}"))).toBe("{a,b}");
    expect(braces.compile(braces.parse("{a,b}"))).toBe("(a|b)");
    expect(braces.expand(braces.parse("{a,b}"))).toEqual(["a", "b"]);
  });

  it("accepts the depth boundary and literal or escaped delimiters", () => {
    const pattern = "{".repeat(100) + "x" + "}".repeat(100);
    expect(braces.stringify(pattern)).toBe(pattern);
    expect(() => braces.compile(pattern)).not.toThrow();
    expect(braces.expand(pattern)).toEqual([pattern]);
    expect(() => braces.parse("\\{".repeat(101))).not.toThrow();
    expect(() => braces.parse('"' + "{".repeat(101) + '"')).not.toThrow();
    expect(() => braces.parse("[" + "{".repeat(101) + "]")).not.toThrow();
  });

  it("reapplies the patch to a fresh copy and tolerates repeated installs", () => {
    const root = installerFixture();
    const expected = patchedFiles.map(file => readFileSync(path.join(root, "node_modules/braces/lib", file), "utf8"));
    const unpatch = spawnSync("git", ["apply", "--reverse", "--", "patches/braces+3.0.3.patch"], { cwd: root, encoding: "utf8" });
    expect(unpatch.status, unpatch.stderr).toBe(0);

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const result = runInstaller(root);
      expect(result.status, result.stderr).toBe(0);
      expect(patchedFiles.map(file => readFileSync(path.join(root, "node_modules/braces/lib", file), "utf8"))).toEqual(expected);
    }
  });

  it("fails without changing files when the dependency version changes", () => {
    const root = installerFixture();
    writeFileSync(path.join(root, "node_modules/braces/package.json"), JSON.stringify({ name: "braces", version: "3.0.4" }));
    const before = readFileSync(path.join(root, "node_modules/braces/lib/parse.js"), "utf8");
    const result = runInstaller(root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("se encontró 3.0.4");
    expect(readFileSync(path.join(root, "node_modules/braces/lib/parse.js"), "utf8")).toBe(before);
  });

  it("fails without overwriting unexpected dependency sources", () => {
    const root = installerFixture();
    const source = path.join(root, "node_modules/braces/lib/parse.js");
    writeFileSync(source, "// unexpected source\n");
    const result = runInstaller(root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("No se puede aplicar el parche de braces");
    expect(readFileSync(source, "utf8")).toBe("// unexpected source\n");
  });
});
