const express = require('express');

const userRouter = require('./users/index.js');
const { router: authRouter, validateToken } = require('./auth/index.js');
const middleware = require('./middleware.js');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

middleware(app);

app.use('/users', validateToken, userRouter);
app.use('/login', authRouter);

app.listen(port, () =>
  console.log(`Server listens to http://localhost:${port}`)
);
