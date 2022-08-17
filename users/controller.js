import { handleError } from '../util.js';
import model from './model.js';
import userSchema from './userSchema.js';

export function getAll(request, response) {
  const users = model.getAll();

  response.json(users);
}

export function getOne(request, response) {
  const parsedId = parseInt(request.params.id, 10);

  const user = model.getOne(parsedId);

  if (user) {
    response.json(user);
  } else {
    response.statusCode = 404;
    response.send('not found');
  }
}

export function create(request, response) {
  const { value: user, error } = userSchema.validate(request.body);

  if (error) {
    handleError(response, error);
  } else {
    const newUser = model.create(user);

    response.statusCode = 201;
    response.json(newUser);
  }
}

export function update(request, response) {
  const id = parseInt(request.params.id, 10);

  const { value: user, error } = userSchema.validate(request.body);

  if (error) {
    handleError(response, error);
  } else {
    try {
      const updatedUser = model.update(id, user);
      response.json(updatedUser);
    } catch (error) {
      response.statusCode = 400;
      response.send('Whoops something went wrong');
    }
  }
}

export function remove(request, response) {
  const id = parseInt(request.params.id, 10);

  model.remove(id);

  response.statusCode = 204;
  response.send();
}
