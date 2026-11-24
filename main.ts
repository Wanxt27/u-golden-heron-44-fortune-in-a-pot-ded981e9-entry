import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const line =
  "By Sunday, the sun on this windowsill will coax out a new leaf, and your keeper will beam like they grew it themselves.";

// Gate: exactly one line, 1-120 characters, no padding. Fail loudly
// rather than ship an invalid entry.
const chars = [...line];
if (
  chars.length < 1 ||
  chars.length > 120 ||
  line.includes("\n") ||
  line.trim() !== line
) {
  throw new Error(
    `entry line must be a single unpadded line of 1-120 characters, got ${chars.length}`,
  );
}

writeFileSync(`${outDir}/entry.txt`, line, "utf8");

// Round-trip check: what landed on disk must be exactly the gated line.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== line) {
  throw new Error("entry.txt on disk does not match the gated line");
}
