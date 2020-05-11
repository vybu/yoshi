---
id: legacy-flow
title: Legacy Flow
sidebar_label: Legacy Flow
---

## CLI

### Global options

#### `--help` ( `-h` )

Output usage information

Default: `./dist/index.js`

#### `--verbose`

Yoshi will print verbose logs and error messages.

Default: `true` in CI

### start

This will run the specified (server) `entryPoint` file and mount a CDN server.

#### options

##### `--entry-point` ( `-e` ) <img src="https://img.shields.io/badge/deprecated-yellow"/>

Entry point for the app.

Default: `index.js`

##### `--server` <img src="https://img.shields.io/badge/deprecated-yellow"/>

> An alias for `entry-point` configuration option.

Entry point for the app server. Supported only by [app flow](app-flow.md).

Default: `index.js`

##### `--manual-restart`

Get SIGHUP on change and manage application reboot manually

Default: `false`

##### `--with-tests`

Spawn `npm test` after start

Default: `false`

##### `--no-server`

Do not spawn the app server

Default: `false`

##### `--debug`

Allow server debugging, debugger will be available at 127.0.0.1:[port]

Default: `0`

##### `--debug-brk`

Allow server debugging, debugger will be available at 127.0.0.1:[port], process won't start until debugger will be attached

Default: `0`

##### `--production`

Start using unminified production build (the tests would not run in this mode)

Default: `0`

The following are the default values for the CDN server's port, mount directory and whether to serve statics over https or regular http. You can change them in your `package.json`:

```json
"yoshi": {
  "servers": {
    "cdn": {
      "port": 3200,
      "dir": "dist/statics",
      "ssl": false
    }
  }
}
```

##### `--url`

> Similar to the `startUrl` configuration option. If both are specified `--url` will be used.

> Note: You can disable browser opening functionality by using `BROWSER=none` env variable.

Opens the browser on a supplied url, also supports multiple urls separated by comma.

Default: `http://localhost:3000`

### build

#### options

##### `--analyze`

run webpack-bundle-analyzer plugin.

##### `--stats`

output webpack stats file to `dist/webpack-stats.json` (see also [bundle analysis](legacy-guides/bundle-analyze.md))|

##### `--source-map`

Explicitly emit bundle source maps.

This task will perform the following:

1. Compile using `TypeScript` (`*.ts`) or `babel` (`*.js`) files into `dist/`.
2. Copy assets to `dist` folder (ejs/html/images...).

You can specify multiple entry points in your `package.json` file. This gives the ability build multiple bundles at once. More info about Webpack entries can be found [here](http://webpack.github.io/docs/configuration.html#entry).

```json
"yoshi": {
  "entry": {
    "a": "./a",
    "b": "./b",
    "c": ["./c", "./d"]
  }
}
```

**Note:** if you have multiple entries you should consider using the [`optimization.splitChunks`](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693)

**Note2:** the decision whether to use `TypeScript` or `babel` is done by searching `tsconfig.json` inside the root directory.

### test

Executes tests using `jest` as default.

#### options

##### `--jest`

Run tests with Jest - this is the default

##### `--mocha`

Run unit tests with Mocha

You can set environment variable `MOCHA_TIMEOUT` to set the timeout for mocha tests.
defaults to 30000ms

##### `--jasmine`

Run unit tests with Jasmine

##### `--karma`

Run tests with Karma (browser)

##### `--protractor`

Run e2e tests with Protractor (e2e)

##### `--watch`

Run tests on watch mode (works for mocha, jasmine, jest & karma)

##### `--debug`

Allow test debugging (works for mocha, jest & protractor)

##### `--debug-brk`

Allow test debugging (works for mocha, jest & protractor), process won't start until debugger will be attached

##### `--coverage`

Collect and output code coverage

#### Examples

- Jest test setup:

  Every other argument you'll pass to `yoshi test` will be forwarded to jest, For example:

  `yoshi test --forceExit foo.spec.js`

  Will run jest on `foo.spec.js` file and will apply [`forceExit`](https://jestjs.io/docs/en/cli#forceexit).

  **Note:** `--debug & --debug-brk` won't be transfer to jest, but instead will be [used in yoshi for test debugging](https://jestjs.io/docs/en/troubleshooting#tests-are-failing-and-you-don-t-know-why)

- Mocha tests setup:

  You can add a `test/mocha-setup.js` file, with mocha tests specific setup. Mocha will `require` this file, if exists.
  Example for such `test/mocha-setup.js`:

  ```js
  import "babel-polyfill";
  import "isomorphic-fetch";
  import sinonChai from "sinon-chai";
  import chaiAsPromised from "chai-as-promised";
  import chai from "chai";

  chai.use(sinonChai);
  chai.use(chaiAsPromised);
  ```

- Karma tests setup:

  When running tests using Karma, make sure you have the right configurations in your `package.json` as described in [`yoshi.specs`](#wixspecs) section. In addition, if you have a `karma.conf.js` file, the configurations will be merged with our [built-in configurations](yoshi/config/karma.conf.js).

- Jasmine tests setup:

  Specifying a custom glob for test files is possible by configuring `package.json` as described in [`yoshi.specs`](#wixspecs). The default glob matches `.spec.` files in all folders.

  If you wish to load helpers, import them all in a file placed at `'test/setup.js'`.

### lint

#### options

##### `--fix`

Automatically fix lint problems

Default: `false`

##### `--format`

Use a specific formatter for eslint/tslint

Default: `stylish`

##### `[files...]`

Optional list of files (space delimited) to run lint on

Default: empty

Executes linters based on the project type:

- [`TSLint`](https://palantir.github.io/tslint/) for TypeScript projects (a `tslint.json` configuration file is required)
- [`ESLint`](https://eslint.org/) for Babel projects (an `.eslintrc` configuration file is required)

### release

#### options

##### `--minor`

bump a minor version instead of a patch

Default: `false`

Bump the patch version in `package.json` using `wnpm-release`. -->

## Configuration

Configurations are meant to be inside `package.json` under `yoshi` section or by passing flags to common tasks, for example:

```json
{
  "name": "my-project",
  "version": "0.0.1",
  "yoshi": {
    "entry": {
      "app": "./app2.js"
    }
  }
}
```

Alternatively, you can create a file named `yoshi.config.js` in your project's root directory, and export an object with the configuration you need. For example:

```js
module.exports = {
  entry: {
    app: "./app2.js"
  }
};
```

> Yoshi will prefer configuration from `package.json` over `yoshi.config.js` file.

### extends

A path to a package that sets up defaults for `yoshi`'s config. The project's config can override those defaults.

The purpose of this option is to allow reusing configurations that are the same across multiple (similar) projects.

Here's an example of how a simple `extends` file looks like:

```js
module.exports = {
  defaultConfig: {
    exports: "[name]",
    externals: {
      lodash: "lodash"
    }
  }
};
```

### separateCss

By default, your `require`d css will bundled to a separate `app.css` bundle. You can leave your css in main js bundle by adding the following to your `package.json`:

```json
"yoshi": {
  "separateCss": false
}
```

### splitChunks

Configure webpack's `optimization.splitChunks` option. It's an opt-in feature that creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points.

Supports both `false` value _(default)_, `true` and a [configuration object](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693#configuration):

```json
"yoshi": {
  "splitChunks": true
  }
```

### cssModules

We use [css modules](https://github.com/css-modules/css-modules) as default. You can disable this option any time by adding the following to wix section inside your `package.json`:

```json
"yoshi": {
  "cssModules": false
}
```

You also use the `prod` keyword to only separate css on CI and production, this is useful for speeding up HMR on local dev environments.

```json
"yoshi": {
  "separateCss": "prod"
}
```

Disabling cssModules on a specific css file is possible by adding `.global` before file extension.
For example:

`./Counter.global.scss` //no css modules for this file

Using css modules inside your component is easy:

```js
import s from "./Counter.scss"; // import css/scss

<p className={s.mainColor}>{counterValue}</p>;
```

Using css when css modules are turned off:

```js
import "./Counter.scss"; // import css/scss

<p className="mainColor">{counterValue}</p>;
```

### tpaStyle

Set to true to build with TPA style.

### enhancedTpaStyle

Set to true to build with enhanced TPA style.

- ![status experimental](https://img.shields.io/badge/status-experimental-ff69b4.svg)

### separateStylableCss

Output the stylable css into `app.stylable.bundle.css` file.

> By default, the Stylable CSS output will be bundled to the JS bundle (using the [`includeCSSInJS` option](https://github.com/wix/stylable/tree/master/packages/webpack-plugin#plugin-configuration-options)).

```json
"yoshi": {
  "separateStylableCss": true
}
```

### clientProjectName

The name of the client project.

### keepFunctionNames

Set to true to keep function names when uglifying

### entry

Explanation is in [cli/build](#build) section.

### servers.cdn

Configuration for the CDN server. The default config is:

```json
{
  "yoshi": {
    "servers": {
      "cdn": {
        "ssl": false,
        "port": 3200,
        "dir": "dist/statics",
        "url": "http://localhost:3200"
      }
    }
  }
}
```

#### ssl

By setting ssl to true your CDN server will start with HTTPS. You may have to approve the certificates by manually going to `https://localhost:3200` on your browser.

#### url

Yoshi will take care to switch between http and https when using ssl, but you can also manually set the url with this option.

### externals

Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime (as a script tags)

```json
{
  "yoshi": {
    "externals": {
      "react": "React"
    }
  }
}
```

### startUrl

> Similar to `yoshi start --url` cli option
> If both are specified `--url` will be used.

opens the browser on the specified url.
Supports a url string or an array of url strings.

### specs

Specs globs are configurable. `browser` is for karma, `node` is for mocha and jasmine.

```json
{
  "yoshi": {
    "specs": {
      "browser": "dist/custom/globs/**/*.spec.js",
      "node": "dist/custom/globs/**/*.spec.js"
    }
  }
}
```

For example:

```json
{
  "yoshi": {
    "specs": {
      "browser": "dist/src/client/**/*.spec.js",
      "node": "dist/src/server/**/*.spec.js"
    }
  }
}
```

### exports

> Please use **exports** and not export, there is a bug that the search doesn't work

If set, export the bundle as library. `yoshi.exports` is the name.

Use this if you are writing a library and want to publish it as single file. Library will be exported with `UMD` format.

### transpileTests

An option to not transpile tests with Babel (via `@babel/register`). Defaults to `true`.

### hmr

`Boolean` | `"auto"`

Set to `false` in order to disable hot module replacement. (defaults to true)

`"auto"` is an experimental feature which provides zero configuration HMR for react. It will include `react-hot-loader` to the top of the entry file and will wrap React's root component in special Higher Order Component which enables hot module reload for react. Also it will call `module.hot.accept` on the project's entry file.

### liveReload

`Boolean`

If true, instructs the browser to physically refresh the entire page if / when webpack indicates that a hot patch cannot be applied and a full refresh is needed.

### performance

Allows to use the Webpack Performance Budget feature.
The configuration object is the same as in webpack.
For more info, you can read the [webpack docs](https://webpack.js.org/configuration/performance/).

### resolveAlias

Allows you to use the Webpack Resolve Alias feature.
The configuration object is the same as in Webpack, note that the paths are relative to Webpack's context.
For more info, you can read the [webpack docs](https://webpack.js.org/configuration/resolve/#resolve-alias).

### hooks

Run a shell script at a specific time in yoshi's execution.

For example:

```json
{
  "yoshi": {
    "hooks": {
      "prelint": "echo running-before-lint"
    }
  }
}
```

Next time you'll run `yoshi lint`, this command will execute and only then the linter will run.

**supported hooks:**

- `prelint` - Runs before the linter

**Missing a hook?** Feel free to open issues/PRs for more hooks if needed.

### umdNamedDefine

`Boolean`

If option is `true` AMD modules of the UMD build will have names. Otherwise an anonymous define is used(the same as in [webpack](https://webpack.js.org/configuration/output/#output-umdnameddefine)).
By default it is `true`.
