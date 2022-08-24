import { Response } from 'express';
import Joi from 'joi';

export default function handleError(
  response: Response,
  error: Joi.ValidationError
): void {
  response.statusCode = 400;
  response.send(error.details.map((details) => details.message).join('. '));
}
