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
