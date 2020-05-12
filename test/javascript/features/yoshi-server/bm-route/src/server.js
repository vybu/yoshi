import { Server } from 'yoshi-server';

const bootstrap = require('@wix/wix-bootstrap-ng');

bootstrap()
  .express(async (app, context) => {
    const server = await Server.create(context);

    // a middleware that mimic fryingpan/BMtestkit:
    app.use((req, res, next) => {
      req.url = req.url.replace('/_api/bm-js', '/api');
      next();
    });
    app.all('*', server.handle);

    return app;
  })
  .start({
    disableCluster: true,
  });
