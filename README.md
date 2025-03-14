> [!IMPORTANT]
> On the 11th March 2025 the TypeScript team officially [announced](https://devblogs.microsoft.com/typescript/typescript-native-port/)
> and [open sourced](https://github.com/microsoft/typescript-go) a Go port of the TypeScript Compiler (TSC). Since the current TSP version
> is based on the TypeScript implementation of TSC, we would stop being able to leverage improvements to the upstream TSC codebase once
> the Go port becomes to official version. At this point, we could switch the upstream to the Go port, however this port is still early
> and keeping up with commits would likely be challenging. Therefore, this project is being suspended until the Go port becomes the official
> stable version of TypeScript. Until then, I plan to familiarise myself with the Go implementation, and continue planning language features.

# TypeScript Plus (TSP)

[![npm version](https://badge.fury.io/js/@typescript-tsp%2Ftsp.svg)](https://badge.fury.io/js/@typescript-tsp%2Ftsp)

[TSP](https://github.com/bcheidemann/TSP) is a fork and partial superset of the [TypeScript](https://www.typescriptlang.org/)
programming language which aims to implement features incompatible with the [design goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals)
of TypeScript. This includes breaking change upgrades to legacy features such as enums, as well as maintaining support
for valuable language features TypeScript has dropped support for, such as design time type reflection in EcmaScript
decorators.

## Installing

For the latest stable version:

```bash
npm install -D @typescript-tsp/tsp
```

For our nightly builds:

```bash
npm install -D @typescript-tsp/tsp@next
```

## Usage

```bash
# Equivalent to `npx tsc`
npx tsp
```

## Motivation

TypeScripts has clear [design goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals) which are
intended to minimise deviation from the base JavaScript language. There's nothing wrong with these goals, but they
prohibit the development of certain new (and we believe useful) features. The goal of TSP is not to maintain "closeness"
with JavaScript. We believe that TypeScript offers one of the best, most flexible type systems available. This project
aims to explore what is possible when building upon TypeScript's excellent type system, while embracing the
opportunities afforded to us by allowing some strategic breaking changes, and implementing a more expressive syntax
which is not bound by the TypeScript design goals.

## Documenation

TSP specific features are documented in [docs/FEATURES.md](https://github.com/bcheidemann/TSP/blob/main/docs/FEATURES.md).
For TypeScript features, please reference the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).

## Contribute

TSP aims to remain up to date with the latest TypeScript features. As such, if your contribution is not specific to TSP,
it should be made in the upstream [TypeScript repo](https://github.com/microsoft/TypeScript#contribute). However, if
you're interested in contributing to TSP, feel free to open a pull request, or for larger features requiring
discussion, please open an issue. You can find developer documentation [here](./docs/DEVELOPERS.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact
[opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Roadmap

We are currently working on implementing foundational infrastructure, such as patch management and publishing workflows.
For now, there is no roadmap for the development of specific features.
