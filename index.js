import express from 'express';

import userRouter from './users/index.js';
import authRouter, { validateToken } from './auth/index.js';
import middleware from './middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

middleware(app);

app.use('/users', validateToken, userRouter);
app.use('/login', authRouter);

app.listen(port, () =>
  console.log(`Server listens to http://localhost:${port}`)
);
