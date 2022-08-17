import { createWriteStream } from 'node:fs';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
const port = 8080;

const users = [
  {
    id: 1,
    firstname: 'Basti',
    lastname: 'Springer',
  },
  {
    id: 2,
    firstname: 'Claudia',
    lastname: 'Müller',
  },
  {
    id: 3,
    firstname: 'Brigitte',
    lastname: 'Meier',
  },
  {
    id: 4,
    firstname: 'Benno',
    lastname: 'Schmitt',
  },
];

const app = express();
app.use(helmet());
// app.use(helmet.hidePoweredBy());
app.use(express.json());
const stream = createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream }));

// eigene middleware
// app.use((request, response, next) => {
//   console.log('Request: ', request.hostname, request.method, request.url);
//   next();
// });

app.get('/', (request, response) => {
  response.send('Hallo Welt!');
});

app.get('/users', (request, response) => {
  response.json(users);
});

app.get('/users/:id', (request, response) => {
  const parsedId = parseInt(request.params.id, 10);
  const user = users.find((u) => u.id === parsedId);
  if (user) {
    response.json(user);
  } else {
    response.statusCode = 404;
    response.send('not found');
  }
});

app.post('/users', (request, response) => {
  const user = request.body;

  const id = Math.max(...users.map((u) => u.id)) + 1;

  const newUser = { ...user, id };

  users.push(newUser);

  response.statusCode = 201;
  response.json(newUser);
});

app.put('/users/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const user = request.body;

  const index = users.findIndex((u) => u.id === id);

  const existingUser = users[index];
  const updatedUser = { ...existingUser, ...user };
  users[index] = updatedUser;
  response.json(updatedUser);
});

app.delete('/users/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  users.splice(index, 1);

  response.statusCode = 204;
  response.send();
});

app.listen(8080, () =>
  console.log(`Server listens to http://localhost:${port}`)
);
