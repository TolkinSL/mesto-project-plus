import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import BadRequestError from '../utils/BadRequestError';
import AuthError from '../utils/AuthError';
import ConflictError from '../utils/ConflictError';
import NotFoundError from '../utils/NotFoundError';
import config from '../config'; // Путь к файлу конфигурации

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email } = req.body;

  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(error.message));
      }

      if (error.code === 11000) {
        return next(new ConflictError(error.message));
      }

      return next(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь или пароль не найден');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundError('Пользователь или пароль не найден');
        }
        const token = jwt.sign({ _id: user._id }, config.SECRET_KEY, {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(error.message));
      }

      return next(error);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.status(constants.HTTP_STATUS_CREATED).send(users))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(constants.HTTP_STATUS_CREATED).send(user);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  });

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(error.message));
      }
      return next(error);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(error.message));
      }
      return next(error);
    });
};

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  if (!_id) {
    next(new AuthError('You must be authorized'));
  }

  return User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(constants.HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};
