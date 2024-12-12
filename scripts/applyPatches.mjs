import fs from "node:fs/promises";
import { execSync } from 'node:child_process';
import { parse, resolve } from 'node:path';
import { TSPDir, TypeScriptPatchesDir, TypeScriptWorkDir } from "./lib/constants.mjs";

console.log(` > Deleting ${TSPDir}...`)
await fs.rm(TSPDir, { recursive: true, force: true });

console.log(` > Cloning ${TypeScriptWorkDir} into ${TSPDir}...`);
execSync(`git clone --depth=1 ${TypeScriptWorkDir} ${TSPDir}`, {
  stdio: 'inherit',
});

console.log(` > Enumerating patch files in ${TypeScriptPatchesDir}...`);
const patchFiles = await fs.readdir(TypeScriptPatchesDir);

console.log(' > Applying patch files...');
for (const [index, patchFile] of patchFiles.entries()) {
  console.log(` >> [${index + 1}/${patchFiles.length}] Applying patch file ${patchFile}...`);
  const patchFileAbsolutePath = resolve(TypeScriptPatchesDir, patchFile);
  execSync(`git apply ${patchFileAbsolutePath}`, {
    cwd: TSPDir,
    stdio: 'inherit',
  });
  const commitMessage = parse(patchFile).name.replace(/^\d{4}_/, '');
  execSync(`git add .`, {
    cwd: TSPDir,
    stdio: 'inherit',
  });
  execSync(`git commit -m '${commitMessage}'`, {
    cwd: TSPDir,
    stdio: 'inherit',
  });
}

console.log(' > Done.');
