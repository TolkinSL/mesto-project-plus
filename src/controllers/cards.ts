import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import Card from '../models/card';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  return Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(constants.HTTP_STATUS_CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
      }
      return next(error);
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.status(constants.HTTP_STATUS_CREATED).send(cards))
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user._id;
  console.log(id);

  return Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(constants.HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
      }
      if (error.name === 'CastError') {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
      }
      return next(error);
    });
};
