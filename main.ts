import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const finalText: string =
  "You read one word at a time. A mountain reads the valley the same way: one frost, one thaw, one flake of stone. A million years pass. The valley is still there, and the mountain has not reached the end.";

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), finalText, "utf8");
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
