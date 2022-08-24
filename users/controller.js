import { handleError } from '../util.js';
import model from './model.js';
import { createUserSchema, updateUserSchema } from './userSchema.js';

export async function getAll(request, response) {
  const users = await model.getAll();

  response.json(users);
  performance.measure('getAll sent', 'incoming request');
}

export async function getOne(request, response) {
  const parsedId = parseInt(request.params.id, 10);

  const user = await model.getOne(parsedId);

  if (user) {
    response.json(user);
  } else {
    response.statusCode = 404;
    response.send('not found');
  }
}

export async function create(request, response) {
  const { value: user, error } = createUserSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    handleError(response, error);
  } else {
    const newUser = await model.create(user);

    response.statusCode = 201;
    response.json(newUser);
  }
}

export async function update(request, response) {
  const id = parseInt(request.params.id, 10);

  const { value: user, error } = updateUserSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    handleError(response, error);
  } else {
    try {
      const updatedUser = await model.update(id, user);
      response.json(updatedUser);
    } catch (error) {
      response.statusCode = 400;
      response.send('Whoops something went wrong');
    }
  }
}

export async function remove(request, response) {
  const id = parseInt(request.params.id, 10);

  await model.remove(id);

  response.statusCode = 204;
  response.send();
}
