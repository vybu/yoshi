import { Server } from 'yoshi-server';
import { Router } from 'express';

const bootstrap = require('@wix/wix-bootstrap-ng');

bootstrap()
  .express(async (app: Router, context: any) => {
    const server = await Server.create(context);

    // a middleware that mimic fryingpan/BMtestkit:
    app.use((req, res, next) => {
      req.url = req.url.replace('/_api/bm', '/api');
      next();
    });
    app.all('*', server.handle);

    return app;
  })
  .start({
    disableCluster: true,
  });
