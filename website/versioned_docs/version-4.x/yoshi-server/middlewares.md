---
id: built-in-middleware
title: Built-in Middleware
sidebar_label: Built-in Middleware
---

Yoshi Server provides built-in middlewares that parse the incoming request. Those middlewares are:

- [`cookie-parser`](https://github.com/expressjs/cookie-parser) - parse Cookie header and populate `req.cookies` with an object keyed by the cookie names.
- [`wix-express-require-https`](https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-require-https) - redirects requests made through http to http.
- [`wix-express-csrf`](https://github.com/wix-platform/wix-node-platform/blob/master/express/wix-express-csrf/README.md) - provides csrf protection.

# Express Middlewares Support

Yoshi Server provides the `runMiddleware` function, which lets you run an [express middleware]() from your server function/route.

For example, [configuring CORS (cross-origin)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for your server function can be done by leveraging the [cors](https://github.com/expressjs/cors) package.

Let's add `cors` to the our server function:

```js
import Cors from 'cors'
import { method, runMiddleware } from "yoshi-server";

// Initializing the cors middleware
const cors = Cors(); // Enable all CORS requests

export const greeting = method(function(age: number) {
  // Run the middleware
  await runMiddleware(this.req, this.res, cors)

  return {
    name: `world! ${age}`,
    age
  };
});
```

# Applying a middleware for multiple server functions / routes

To apply a middlware to multiple server functions/routes, check the [Custom Server](custom-server) documentation.
