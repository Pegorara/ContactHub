const Joi = require('joi');
const AppError = require('../helpers/AppError');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().allow('', null).messages({
    'string.email': 'Invalid email format',
  }),
  phone: Joi.string().pattern(/^\d{10,11}$/).allow('', null).messages({
    'string.pattern.base': 'Phone number must have 10 or 11 digits',
  }),
  category_id: Joi.string().uuid().allow(null).messages({
    'string.guid': 'Invalid category ID format',
  }),
}).custom((value, helpers) => {
  if (!value.email && !value.phone) {
    return helpers.message('At least one contact method (email or phone) is required');
  }
  return value;
});

function validateContact(req, _res, next) {
  const { error } = contactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message).join(', ');
    throw new AppError(messages, 400);
  }

  next();
}

module.exports = validateContact;
