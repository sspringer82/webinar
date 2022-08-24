const { Router } = require('express');
const connection = require('../db.js');
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.SECRET || 'topSecret';

const router = Router();

router.post('/', async (request, response) => {
  await (await connection).connect();
  const { username, password } = request.body;

  const query =
    'SELECT username FROM users WHERE username = ? AND password = ?';
  const [data] = await (await connection).query(query, [username, password]);

  if (data.length === 1) {
    const token = jsonwebtoken.sign({ username }, secret);
    response.send(token);
  } else {
    response.statusCode = 401;
    response.send('Unauthorized');
  }
});

function validateToken(request, response, next) {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const [, token] = authHeader.split(' ');
    try {
      const decoded = jsonwebtoken.verify(token, secret);
      if (decoded.username) {
        next();
      } else {
        response.statusCode = 401;
        response.send('Unauthorized');
      }
    } catch (error) {
      console.error(error);
      response.statusCode = 401;
      response.send('Unauthorized');
    }
  } else {
    response.statusCode = 401;
    response.send('Unauthorized');
  }
}

module.exports = {
  validateToken,
  router,
};
