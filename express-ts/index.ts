import express from 'express';

import userRouter from './users/index';
import authRouter, { validateToken } from './auth/index';
import middleware from './middleware';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();

middleware(app);

app.use('/users', validateToken, userRouter);
app.use('/login', authRouter);

app.listen(port, () =>
  console.log(`Server listens to http://localhost:${port}`)
);
