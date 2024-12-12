
# TypeScript Plus (TSP)

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

## Motivation

TypeScripts has clear [design goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals) which are
intended to minimise deviation from the base JavaScript language. There's nothing wrong with these goals, but they
prohibit the development of certain new (and we believe useful) features. The goal of TSP is not to maintain "closeness"
with JavaScript. We believe that TypeScript offers one of the best, most flexible type systems available. This project
aims to explore what is possible when building upon TypeScript's excellent type system, while embracing the
opportunities afforded to us by allowing some strategic breaking changes, and implementing a more expressive syntax
which is not bound by the TypeScript design goals.

## Contribute

TSP aims to remain up to date with the latest TypeScript features. As such, if your contribution is not specific to TSP,
it should be made in the upstream [TypeScript repo](https://github.com/microsoft/TypeScript#contribute). However, if
you're interested in contributing to TSP, feel free to open a pull request, or for larger features requiring
discussion, please open an issue.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact
[opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Roadmap

We are currently working on implementing foundational infrastructure, such as patch management and publishing workflows.
For now, there is no roadmap for the development of specific features.
