# Features

This document lists the features supported by TSP which are not supported in the upstream TypeScript language. For
documentation on upstream TypeScript features, check out the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).

## Design Time Type Reflection for TC39 Stage 3 Decorators

TypeScript 5.0 [added support for TC39 stage 3 decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators).
However, some features available in the TypeScript implementation of the [experimental stage 2 decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
are no longer supported in the new implementation.

One such example is design time type reflection. This is a blocker for many prominent TypeScript projects to adopt the
new TC39 decorators standard (e.g. [NestJS](https://github.com/nestjs/nest/issues/11414)). The good news is that adding
support for design time type reflection to the new decorator standard is trivial, and plays nicely with the
[TC39 stage 3 decorator metadata proposal](https://github.com/tc39/proposal-decorator-metadata).

Unfortunately, the feature is at odds with the [TypeScript projects design goals](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals).
Specifically, one of the stated non-goals if typescript is to "Add or rely on run-time type information in programs, or
emit different code based on the results of the type system" and "instead, encourage programming patterns that do not
require run-time metadata." This feature is clearly at odds with this goal, as it both adds run-time type information
and emits different code based on types. This has been a [sticking point for the TypeScript team](https://github.com/microsoft/TypeScript/issues/57533#issuecomment-1972041814).
and has resulted in [progress on this feature stalling indefinetly](https://github.com/microsoft/TypeScript/pull/58101).

Currently, TSP supports design time type reflection for TC39 decorators.

> [!NOTE]
> For now, it is necessary to polyfill `Symbol.metadata` as follows:
> 
> ```ts
> // @ts-nocheck
> Symbol.metadata ??= Symbol.for('Symbol.metadata');
> ```
>
> In future versions of TSP this won't be necessary.

```ts
function logDesignTimeTypeinfo(target: null, context: DecoratorContext) {
  const typeinfo = context.metadata["design:typeinfo"][context.name];
  console.log('type:', typeinfo.type?.());
  console.log('paramTypes:', typeinfo.paramTypes?.());
  console.log('returnType:', typeinfo.returnType?.());
}

class Test {
  @logDesignTimeTypeinfo
  public testProperty: string;

  @logDesignTimeTypeinfo
  public testMethod(a: String, b: number): Test {
    return this;
  }
}

console.log(Test[Symbol.metadata]);
```

```
// @logDesignTimeTypeinfo (testMethod)
type: [Function: Function]
paramTypes: [ [Function: String], [Function: Number] ]
returnType: [class Test]

// @logDesignTimeTypeinfo (testProperty)
type: [Function: String]
paramTypes: undefined
returnType: undefined

// Test[Symbol.metadata]
{
  'design:typeinfo': {
    testMethod: {
      type: [Function (anonymous)],
      paramTypes: [Function (anonymous)],
      returnType: [Function (anonymous)]
    },
    testProperty: {
      type: [Function (anonymous)]
    }
  }
}
```
