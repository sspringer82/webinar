import { createWriteStream } from 'node:fs';
import express, { Express, Request, Response, NextFunction } from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';

export default function (app: Express) {
  // app.use(helmet());
  // app.use(helmet.hidePoweredBy());
  app.use(express.json());
  const stream = createWriteStream('./access.log', { flags: 'a' });
  app.use(morgan('combined', { stream }));

  // eigene middleware
  app.use((request: Request, response: Response, next: NextFunction) => {
    console.log('Request: ', request.hostname, request.method, request.url);
    next();
  });
}
