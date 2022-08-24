import express from 'express';

import userRouter from './users/index.js';
import authRouter, { validateToken } from './auth/index.js';
import middleware from './middleware.js';
import dotenv from 'dotenv';
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].name, ': ', items.getEntries()[0].duration);
  performance.clearMarks();
});
// obs.observe({ type: 'measure' });

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use((req, res, next) => {
  performance.mark('incoming request');
  next();
});

middleware(app);

app.use('/users', validateToken, userRouter);
app.use('/login', authRouter);

app.listen(port, () => {
  console.log(`Server listens to http://localhost:${port}`);
  performance.measure('Server is ready');
});
