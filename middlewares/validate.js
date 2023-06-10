const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('./urlValidator');

const vlaidatorCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator, 'urlValidator'),
  }),
});

const vlaidatorUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator, 'urlValidator'),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

const vlaidatorToken = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

const vlaidatorUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

const vlaidatorCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().custom(urlValidator, 'urlValidator'),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

const vlaidatorCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

module.exports = {
  vlaidatorCreateUser,
  vlaidatorUserBody,
  vlaidatorToken,
  vlaidatorUserId,
  vlaidatorCard,
  vlaidatorCardId,
};
