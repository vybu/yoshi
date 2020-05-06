---
id: exposing-route
title: Exposing a Route
sidebar_label: Exposing a Route
---

Since server functions are consumed from the client, we'll use route functions to expose routes to the outside world. Route functions are similar to server functions and support expressing routes (along with URL parameters) via the filesystem:

Files in `src/routes` will be mapped to a route on the server with a URL that matches the filesystem. For example, `src/routes/users/create.js` will translate into `/users/create`.

```js
//src/routes/app.js
import { route } from "yoshi-server";

export default route(async function() {
  return {
    name: "world!"
  };
});
```

We can then call this route on:

`http://www.mydomain.com/app`

### Route with params

Named parameters can be used by wrapping the filename or directory name with `[]` and are available to the route function as `this.params`. For example: `src/routes/users/[userid].js` will map into `/users/:userid`:

```js
//src/routes/users/[userid].js
import { route } from "yoshi-server";

export default route(async function() {
  return {
    data: `hello ${this.params.userid}`
  };
});
```

We can then call this route on:

`http://www.mydomain.com/users/123`

_Note_: You can have multiple params (all available under `this.params`):

`//src/routes/users/[userid]/apps/[appid].js` -> `http://www.mydomain.com/users/123/apps/myAppId`

### Index route

Default route ('/') can be used by adding an `index.[j|t]s` file:
`//src/routes/index.js`

You will then be able to access it on:

`http://www.mydomain.com`

### Rendering an `ejs` template from a route

Rendering EJS templates can be done by calling the renderView() function. It accepts the `response` object, a template path and the data, and will render the template.

```js
import { renderView, route } from "yoshi-server";

export default route(async function() {
  renderView(this.res, "app", {
    title: "hello world"
  });

  return html;
});
```

### context (this)

Our context exposes the following properties:

| name     | type                                                                      | description                                                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| req      | [Request](https://github.com/types/express/blob/master/lib/request.d.ts)  | [Express's](http://expressjs.com) request object                                                                                                                                                                                                             |
| res      | [Response](https://github.com/types/express/blob/master/lib/request.d.ts) | [Express's](http://expressjs.com) response object                                                                                                                                                                                                            |
| initData | any                                                                       | An object returned from a `src/init-server.js` / `src/init-server.ts` file. This data is usefull when you need to read / fetch data on server initialization (for example, read a configuration file).                                                       |
| params   | { [param: string]: any }                                                  | a key value dictionary of url params                                                                                                                                                                                                                         |
| context  | BootstrapContext                                                          | [wix-bootstrap-ng](https://github.com/wix-platform/wix-node-platform)'s [context](https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-ng#context) object.                                                                  |
| config   | any                                                                       | an object containg the project's `.erb` configuration file. Loading this object is done by convention, assuming the `.erb` file will be called the same as the project's name in `package.json` (stripping organization name, if exists). see example below. |

Config object example:

```json
//package.json
{
  "name": "@wix/my-cool-project",
  ...
}
```

Then your `.erb` file should be:

```json
// templates/my-cool-project.json.erb
{
  "hello": "world"
}
```

And anywhere in your route / api functions:

```
console.log(this.config.hello); //logs 'world'
```

### route

`route` is a helper function used to add typing for our context (this). This will work both in Javascript and Typescript code.

```js
import { route } from "yoshi-server";

export default route(async function() {
  // Adds type completions for `this`
  console.log(this.req);

  return {
    name: "world!"
  };
});
```
