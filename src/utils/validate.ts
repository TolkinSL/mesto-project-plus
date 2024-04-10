import { Joi, celebrate, Segments } from 'celebrate';

// eslint-disable-next-line no-useless-escape
const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=.]+$/;

export const valCreateCard = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
});

export const valCardId = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const valUserById = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
});

export const valUpdateUser = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),

  }),
});

export const valUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlRegExp),
  }),
});

export const valLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const valCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
  }),
});

