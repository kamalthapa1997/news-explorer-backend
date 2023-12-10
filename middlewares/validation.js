const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
const validateNewsArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateURL),
  }),
});

const validateuserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().email().min(2).max(30).required(),
    password: Joi.string().min(2).max(30).required(),
  }),
});

const validateloginAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().min(2).max(30).messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateNewsArticle,
  validateUserId,
  validateloginAuth,
  validateuserInfo,
};
