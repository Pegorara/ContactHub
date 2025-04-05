const Joi = require('joi');
const AppError = require('../helpers/AppError');

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a text',
    'string.empty': 'Name is required',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Name must have at most 50 characters',
    'any.required': 'Name is required'
  }),
});

function validateContact(req, _res, next) {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message).join(', ');
    throw new AppError(messages, 400);
  }

  next();
}

module.exports = validateContact;
