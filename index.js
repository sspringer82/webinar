import express from 'express';

import userRouter from './users/index.js';
import middleware from './middleware.js';

const port = 8080;

const app = express();

middleware(app);

app.use('/users', userRouter);

app.listen(8080, () =>
  console.log(`Server listens to http://localhost:${port}`)
);
