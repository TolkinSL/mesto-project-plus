import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import Card from '../models/card';
import mongoose from "mongoose";
import NotFoundError from "../utils/NotFoundError";
import BadRequestError from "../utils/BadRequestError";
import PermissionError from "../utils/PermissionError";

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

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    });

    if (!userId || card.owner.toString() !== userId) {
      throw new PermissionError('Удалить карточку может только владелец');
    }
    await Card.deleteOne({ _id: cardId });
    return res
      .status(constants.HTTP_STATUS_OK)
      .send('Карточка удалена');
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.status(constants.HTTP_STATUS_OK).send({ message: 'Лайк поставлен' });
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
    }
    return next(error);
  });

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.status(constants.HTTP_STATUS_OK).send({ message: 'Лайк убран' });
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: error.message });
    }
    return next(error);
  });
