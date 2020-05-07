---
id: custom-server
title: Custom Server
sidebar_label: Custom Server
---  

Yoshi Server is handling all incoming requests to your server. This means that your server code is made of server functions and routes, and you do not have your own server file for handling the requests.

Sometimes, you need to use custom setup, such as custom middlewares, routing, db connection, etc. To do that, add your own server file, which handles specific API calls, and then delegate to all other requests to Yoshi Server. This is also very useful when having a gradual migration to Yoshi Server.

> Before deciding to use a custom server, please keep in mind that it should only be used when Yoshi Server does not meet your requirements.

To add a custom server, start by creating a `src/server.ts` (or `src/server.js`) file to your project:

```js
// server.ts
import { Server } from "yoshi-server";
import { Router } from "express";
import bootstrap from "@wix/wix-bootstrap-ng";
import { BootstrapContext } from "@wix/wix-bootstrap-ng/typed";

bootstrap()
  .express(async (app: Router, context: BootstrapContext) => {
    // Initialise Yoshi Server instance
    const server = await Server.create(context);

    // Use custom middleware, routing, db connection
    // or even mount `yoshi-server` on a different path
    app.get("/foo", (req, res) => {
      res.send("bar");
    });

    // All other requests are handled by Yoshi Server
    app.all("*", server.handle);

    return app;
  })
  .start();
```

Then, update your `index.js` file to require the transpiled version of your server file:

```diff
-require("yoshi-server/bootstrap");
+require("./dist/server");
```
