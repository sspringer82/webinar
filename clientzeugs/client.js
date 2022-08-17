/*
import { request } from 'node:http';

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/users',
  method: 'GET',
};

const req = request(options, (response) => {
  let body = '';
  response.on('data', (chunk) => (body += chunk));
  response.on('end', () => {
    console.log(body);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
*/

try {
  // const [, , host] = process.argv;

  const host = 'localhost:8080';
  const url = `http://${host}/users`;
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
} catch (error) {
  console.error(error);
}
