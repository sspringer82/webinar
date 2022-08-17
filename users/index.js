import { Router } from 'express';

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

const router = Router();

router.get('/', (request, response) => {
  response.json(users);
});

router.get('/:id', (request, response) => {
  const parsedId = parseInt(request.params.id, 10);
  const user = users.find((u) => u.id === parsedId);
  if (user) {
    response.json(user);
  } else {
    response.statusCode = 404;
    response.send('not found');
  }
});

router.post('/', (request, response) => {
  const user = request.body;

  const id = Math.max(...users.map((u) => u.id)) + 1;

  const newUser = { ...user, id };

  users.push(newUser);

  response.statusCode = 201;
  response.json(newUser);
});

router.put('/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const user = request.body;

  const index = users.findIndex((u) => u.id === id);

  const existingUser = users[index];
  const updatedUser = { ...existingUser, ...user };
  users[index] = updatedUser;
  response.json(updatedUser);
});

router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  users.splice(index, 1);

  response.statusCode = 204;
  response.send();
});

export default router;
