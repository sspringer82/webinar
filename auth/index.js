import { Router } from 'express';
import connection from '../db.js';
import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.SECRET;

const router = Router();

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const query =
    'SELECT username FROM users WHERE username = ? AND password = ?';
  const [data] = await connection.query(query, [username, password]);

  if (data.length === 1) {
    const token = jsonwebtoken.sign({ username }, secret);
    response.send(token);
  } else {
    response.statusCode = 401;
    response.send('Unauthorized');
  }
});

export function validateToken(request, response, next) {
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

export default router;
