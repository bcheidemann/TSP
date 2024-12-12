import fs from "node:fs/promises";
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { TSPDir, TypeScriptPatchesDir } from "./lib/constants.mjs";
import assert from "node:assert";

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

console.log(' > Done.');
