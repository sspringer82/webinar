import Joi from 'joi';

export default Joi.object().keys({
  id: Joi.number(),
  firstname: Joi.string().alphanum().min(1).max(30).required(),
  lastname: Joi.string().alphanum().min(1).max(30).required(),
});
