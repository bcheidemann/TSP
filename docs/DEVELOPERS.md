# Developer Docs

## Getting Started

1. Clone the repo (including submodules)
2. Run `npm install`
3. Run `npm run applyPatches`
4. Run `npm install` (in `./TSP`)

This will create a subdirectory called `TSP`. This is a local git repository where you can make changes and commit them
like in any other repo. Each commit in the `TSP` directory corresponds to a patch file in the `patches/TypeScript`
directory.

Once you've committed your changes in the `TSP` directory, you will need to regenerate the patches. This can be done by
running `npm run regeneratePatches`. You should then commit the new patch files in the root repo.

Ideally, each patch should correspond to one commit in the root repo. If you are generating patch files as you go, you
can run `npm run regeneratePatches -- --commit` to automatically commit the patch files with the same commit message as
was used for the source commit.

Otherwise, we mostly follow the same workflow as the upstream TypeScript project. You can follow their
[Instructions for Contributing Code](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md#instructions-for-contributing-code).

## Local Publishing

Sometimes it's useful to be able to try out new features in a blank project. To facilitate this, a local NPM repository
can be set up by running `npm run verdaccio`. To publish the current version of TSP to the repo, follow these steps in
`./TSP`:

1. Run `npx hereby LKG`
2. Run `npm publish --registry http://localhost:4873/`

If you've already published a version, you'll get a conflict if you don't remove the old one. You can remove the old
version with by running `rm -rf .verdaccio/storage/@typescript-tsp` from the project root. You'll need to re-install TSP
in any local projects which are using the Verdaccio registry after publishing.
