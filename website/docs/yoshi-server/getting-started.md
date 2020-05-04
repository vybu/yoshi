---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

> This feature in under development. It will be available soon.

Welcome to Yoshi Server documentation!

Yoshi Server makes it easier to consume data from the server by adding an abstraction over client server communication, using conventions.

## Setup

We recommend creating a new Yoshi Server app using the [`create-yoshi-app`](https://wix.github.io/yoshi/docs/getting-started/create-app). It is available for both Fullstack and Business Manager apps.

```bash
npx create-yoshi-app my-app-name
```

## Manual Setup

##### Prerequisits

- A fullstack app (both server and client are together, using the same `package.json` file).
- We currently support only projects using the `app-flow` ("projectType": "app" in your Yoshi configuration). If you do not use it, please migrate first (see https://wix.github.io/yoshi/docs/guides/app-flow for more details)

Install `yoshi-server` and `yoshi-server-client`:

```
npm install yoshi-server yoshi-server-client
```

Update `yoshi.config.js` of `package.json`'s `yoshi` section:

```diff
"yoshi": {
  "projectType": "app",
+  "yoshiServer": true,
...
}
```

Set your server to handle requests

Yoshi Server will handle server requests by convention (see [server functions](consuming-data-from-the-server#server-functions) and [route functions](exposing-route)). All we have to do is bootstrap it from our `index.js` file:

```js
require("yoshi-server/bootstrap");
```

Now you are ready to add your first Yoshi Server function.

## Adding your first Yoshi Server function

> Files with `.api.js` or `.api.ts` extention with named export functions will be treated as [server functions](consuming-data-from-the-server#server-functions).

Add a `greet.api.ts` file to your project (if your project is in Javascript, use `.js` for all examples):

```js
// greet.api.ts
import { method } from "yoshi-server";

export const greeting = method(function(name: string) {
  return {
    greet: `hello ${name}!`,
    name
  };
});
```

Now that we have our first server function (`greeting`), let's consume the data from our client code.

```js
import HttpClient from "yoshi-server-client";
import { greeting } from "./greet.api";

// For Business Manager modules, we map all api requests to '/_api/projectName'
const client = new HttpClient({ baseUrl: "/_api/projectName" });

client.request({ method: greeting, args: ["John"] }).then(data => {
  console.log(data.greet);
});
```

That's it!

Running `npx yoshi start` shows `hello John` in the console.

#### What just happened here?

- `yoshi-server-client` is triggering xhr calls behind the scenes.
- `yoshi-server` has one endpoint, `_api_` (open devtools to see it). All requests are made as `post` requests, with data about the function that we want to call and the arguments.
- If you are using Typescript, server arguments and response are typed!
- For Business Manager modules, all API requests to `/_api/projectName` are mapped to `/_api_` (Yoshi Server)
