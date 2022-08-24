const Joi = require('joi');

const createUserSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
});

const updateUserSchema = Joi.object().keys({
  id: Joi.number().required(),
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
