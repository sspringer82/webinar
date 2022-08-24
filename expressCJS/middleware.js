const { createWriteStream } = require('node:fs');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = function (app) {
  app.use(helmet());
  // app.use(helmet.hidePoweredBy());
  app.use(express.json());
  const stream = createWriteStream('./access.log', { flags: 'a' });
  app.use(morgan('combined', { stream }));

  // eigene middleware
  app.use((request, response, next) => {
    console.log('Request: ', request.hostname, request.method, request.url);
    next();
  });
};
