import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const run = spawnSync(process.execPath, ["main.ts"], {
  cwd: root,
  env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
  encoding: "utf8",
});

if (run.status !== 0) {
  console.error(`main.ts exited with status ${run.status}`);
  console.error(run.stdout);
  console.error(run.stderr);
  process.exit(1);
}

const file = join(outDir, "entry.txt");
const buffer = readFileSync(file);
const text = buffer.toString("utf8");
const validUtf8 = Buffer.from(text, "utf8").equals(buffer);
const codePoints = [...text].length;
const notOnlyWhitespace = text.trim().length > 0;

console.log("entry.txt");
console.log("---------");
console.log(text);
console.log("---------");
console.log(`UTF-8 valid: ${validUtf8}`);
console.log(`Length: ${codePoints} code point${codePoints === 1 ? "" : "s"}`);
console.log(`Not only whitespace: ${notOnlyWhitespace}`);

if (!validUtf8) {
  console.error("FAIL: entry.txt is not valid UTF-8");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 280) {
  console.error(`FAIL: length ${codePoints} is outside 1-280`);
  process.exit(1);
}
if (!notOnlyWhitespace) {
  console.error("FAIL: entry.txt is only whitespace");
  process.exit(1);
}

console.log("PASS");
