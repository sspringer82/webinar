import { createWriteStream } from 'node:fs';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default function (app) {
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
}
