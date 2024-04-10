import { Router } from 'express';
import { createCard, getCards, deleteCard, likeCard, dislikeCard } from '../controllers/cards';
import { valCardId, valCreateCard } from '../utils/validate';

const cardRouter = Router();

cardRouter
  .post('/', valCreateCard, createCard)
  .get('/', getCards)
  .delete('/:cardId', valCardId, deleteCard)
  .put('/:cardId/likes', valCardId, likeCard)
  .delete('/:cardId/likes', valCardId, dislikeCard);

export default cardRouter;
