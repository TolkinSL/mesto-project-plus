import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import User from '../models/user';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
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
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
    }
    return res.status(constants.HTTP_STATUS_CREATED).send(user);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
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
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
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
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
      }
      return next(error);
    });
};
