// Repairs worker chunk imports after a static export.
//
// The bundler content-hashes MapLibre's shared worker chunk (for example
// maplibre-gl-shared.0buf0g1c8ph8b.mjs) but leaves the import inside
// maplibre-gl-worker.<hash>.mjs pointing at the unhashed "./maplibre-gl-shared.mjs".
// That path 404s, the worker fails to start, and every vector source in the map
// silently produces nothing — no territory fills, no campaign routes. Rewriting
// the specifier to the emitted filename fixes it.
//
// Exits non-zero if any relative import is still unresolved, so a broken map
// fails the build instead of shipping.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = process.argv.slice(2);
if (!roots.length) { console.error("usage: node build/fix-worker-imports.mjs <dir> [dir...]"); process.exit(1); }

const IMPORT_PATTERN = /(from\s*|import\s*\(?\s*)"(\.\/[^"]+\.mjs)"/g;

function walk(dir, found = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return found; }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found);
    else if (entry.endsWith(".mjs")) found.push(full);
  }
  return found;
}

// "maplibre-gl-shared.0buf0g1c8ph8b.mjs" -> stem "maplibre-gl-shared"
const stemOf = (fileName) => fileName.replace(/\.mjs$/, "").split(".")[0];

let rewritten = 0;
let unresolved = 0;

for (const root of roots) {
  const files = walk(root);
  if (!files.length) continue;
  // Group siblings by directory: imports are relative, so resolve per folder.
  const byDirectory = new Map();
  for (const file of files) {
    const directory = file.slice(0, file.lastIndexOf("\\") === -1 ? file.lastIndexOf("/") : file.lastIndexOf("\\"));
    if (!byDirectory.has(directory)) byDirectory.set(directory, []);
    byDirectory.get(directory).push(file);
  }
  for (const [directory, siblings] of byDirectory) {
    const names = siblings.map((file) => file.slice(directory.length + 1));
    const byStem = new Map();
    for (const name of names) byStem.set(stemOf(name), name);
    for (const file of siblings) {
      const original = readFileSync(file, "utf8");
      let changed = false;
      const updated = original.replace(IMPORT_PATTERN, (match, prefix, specifier) => {
        const wanted = specifier.replace(/^\.\//, "");
        if (names.includes(wanted)) return match; // already resolves
        const actual = byStem.get(stemOf(wanted));
        if (!actual) {
          console.error(`  UNRESOLVED ${specifier} in ${file}`);
          unresolved += 1;
          return match;
        }
        changed = true;
        rewritten += 1;
        console.log(`  ${file.slice(directory.length + 1)}: ${specifier} -> ./${actual}`);
        return `${prefix}"./${actual}"`;
      });
      if (changed) writeFileSync(file, updated, "utf8");
    }
  }
}

console.log(`worker import fix: ${rewritten} rewritten, ${unresolved} unresolved`);
if (unresolved > 0) { console.error("refusing to continue with unresolved worker imports"); process.exit(1); }
