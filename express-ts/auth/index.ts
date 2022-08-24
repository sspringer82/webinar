import { Router, Request, Response, NextFunction } from 'express';
import connection from '../db';
import jsonwebtoken from 'jsonwebtoken';

const secret = 'topSecret';

const router = Router();

router.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const query =
    'SELECT username FROM users WHERE username = ? AND password = ?';
  const [data] = await (await connection).query(query, [username, password]);

  if ((data as unknown[]).length === 1) {
    const token = jsonwebtoken.sign({ username }, secret);
    response.send(token);
  } else {
    response.statusCode = 401;
    response.send('Unauthorized');
  }
});

export function validateToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const [, token] = authHeader.split(' ');
    try {
      const decoded = jsonwebtoken.verify(token, secret) as {
        username: string;
      };
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
