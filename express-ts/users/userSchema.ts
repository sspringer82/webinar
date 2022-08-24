import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
});

export const updateUserSchema = Joi.object().keys({
  id: Joi.number().required(),
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
});
