---
id: initializing-server-data
title: Initializing Server Data
sidebar_label: Initializing Server Data
---

# Initializing Server Data

Yoshi Server functions and routes run for every request, while sometimes we want to run setup code only once, during server initialization.

Start by creating a `src/init-server.[j|t]s` file with a function that receives the node-platform's [context](https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-ng#context) object, and returns any object:

```js
// src/init-server.ts
import { BootstrapContext } from "@wix/wix-bootstrap-ng/typed";
export default async (context: BootstrapContext) => {
  return {
    myData: "hello world"
  };
};
```

Then in your functions/routes, it will be available under `this.initData`:

```js
import { method } from "yoshi-server";

export const greeting = method(function(age: number) {
  console.log(this.initData.myData); // logs 'hello world'

  return {
    name: `world! ${age}`,
    age
  };
});
```
