---
id: node-api
title: Node API
sidebar_label: Node API
---

## Yoshi Serve

`yoshi-common` exposes `serve` functionality through Node API.

Serve runs your `index-dev`/`dev/server` file and serves your `dist/statics` directory as a local CDN.

> Note: You need to build the statics before running serve. You can do that with `yoshi build`.

`serve` method returns a Promise.

Example of usage:

```javascript
const serve = require("yoshi-common/serve");

serve()
  .then(() => {
    console.log("Server and CDN started successfully");
  })
  .catch(errorReason => {
    console.log(errorReason);
  });
```

### Monorepo

In case you are using `yoshi-flow-monorepo` and want to serve all the apps in the monorepo, you can do so using the following api:

```javascript
const serve = require("yoshi-flow-monorepo/serve");

serve()
  .then(() => {
    console.log("All Servers and CDNs started successfully");
  })
  .catch(errorReason => {
    console.log(errorReason);
  });
```
