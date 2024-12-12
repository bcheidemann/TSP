import fs from "node:fs/promises";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { argv } from "node:process";
import { TSPDir, TypeScriptPatchesDir } from "./lib/constants.mjs";
import assert from "node:assert";

const ALLOW_DIRTY_ROOT = argv.includes("--allow-dirty-root");

console.log(` > Checking for uncommitted changes in root...`);
const modifiedRootFiles = execSync('git status --porcelain', {
  encoding: 'utf8',
}).trim();
if (modifiedRootFiles) {
  console.log(modifiedRootFiles);
  if (ALLOW_DIRTY_ROOT) {
    console.warn('[WARNING] Directory is not clear: root');
  }
  else {
    throw new Error('Directory must be clean: root');
  }
}

console.log(` > Checking for uncommitted changes in ${TSPDir}...`);
const modifiedTspFiles = execSync('git status --porcelain', {
  encoding: 'utf8',
  cwd: TSPDir,
}).trim();
if (modifiedTspFiles) {
  console.log(modifiedTspFiles);
  throw new Error(`Directory must be clean: ${TSPDir}`);
}

console.log(` > Emptying ${TypeScriptPatchesDir}...`)
await fs.rm(TypeScriptPatchesDir, { recursive: true, force: true });
await fs.mkdir(TypeScriptPatchesDir, { recursive: true });

console.log(` > Enumerating commits in ${TSPDir}...`);
const commits = execSync(`git log @{upstream}..HEAD --format='%H:%P:%s'`, {
  encoding: 'utf8',
  cwd: TSPDir,
}).split('\n').filter(Boolean).map(commit => {
  const [hash, parent, ...messageParts] = commit.split(':');
  return { hash, parent, message: messageParts.join(':') };
}).reverse();

console.log(` > Generating patch files...`);
assert(commits.length <= 9999, 'Too many commits');
for (const [index, commit] of commits.entries()) {
  console.log(` >> [${index + 1}/${commits.length}] Generating patch file for ${commit.hash} (${commit.message})...`);
  const patch = execSync(`git diff ${commit.parent}..${commit.hash}`, {
    encoding: 'utf8',
    cwd: TSPDir,
  });
  const sanitizedMessage = commit.message.replace(/[^a-zA-Z0-9-_]/g, '_');
  await fs.writeFile(join(TypeScriptPatchesDir, `${index.toString().padStart(4, '0')}_${sanitizedMessage}.patch`), patch, 'utf8');
}

console.log(' > Syncing files...');
export const syncedEntries = [
  {
    type: "file",
    from: join(TSPDir, "README.md"),
    to: "README.md",
  },
  {
    type: "file",
    from: join(TSPDir, ".github/workflows/nightly.yaml"),
    to: ".github/workflows/nightly.yaml",
  }
];
for (const [index, syncedEntry] of syncedEntries.entries()) {
  console.log(` >> [${index + 1}/${syncedEntries.length}] Syncing ${syncedEntry.type} from ${syncedEntry.from} to ${syncedEntry.to}...`);
  if (syncedEntry.type === "file") {
    await fs.mkdir(dirname(syncedEntry.to), { recursive: true });
    try {
      await fs.rm(syncedEntry.to);
    } catch(err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
    await fs.copyFile(syncedEntry.from, syncedEntry.to);
  }
  else {
    throw new Error(`Unknown entry type: ${syncedEntry.type}`)
  }
}

console.log(' > Done.');
