import keystone from 'keystone';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import config from '../webpack.config.js';
import createTemplate from './utils/createTemplate';

const isDeveloping = process.env.NODE_ENV !== 'production';
const importRoutes = keystone.importer(__dirname);
const compiler = webpack(config);
const mainHash = 'ad807fa5016f97e62e7d';
const vendorHash = '158ebf10428e11d2ccc7';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import store from '../app/src/store/store.js';
import { routes } from '../app/src/utils/routes.jsx';

const serverApiRoutes = {
  api: importRoutes('./api')
};

if (isDeveloping) {
  keystone.pre('routes', webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  keystone.pre('routes', webpackHotMiddleware(compiler, {
    log: console.log // eslint-disable-line
  }));
}

exports = module.exports = function (app) {
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, // eslint-disable-line
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));

  if (isDeveloping) {
    app.all('*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  app.all('/api*', keystone.middleware.api);
  app.get('/api/posts/list', serverApiRoutes.api.posts.getAll);
  app.all('/api/posts/create', serverApiRoutes.api.posts.create);
  app.get('/api/posts/:id', serverApiRoutes.api.posts.getOne);
  app.all('/api/posts/:id/update', serverApiRoutes.api.posts.update);
  app.get('/api/posts/:id/remove', serverApiRoutes.api.posts.remove);

  app.all('/api/contact/create', serverApiRoutes.api.contact.create);

  app.use(express.static('./public'));

  app.use((req, res) => {
    match({ routes, location: req.url },
      (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          const body = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          res.status(200)
            .send(createTemplate(body, store.getState(), mainHash, vendorHash));
        } else {
          res.status(400).send('Not Found 🤔');
        }
      });
  });
};
