import { Router } from 'express';
import { createCard, getCards, deleteCard } from '../controllers/cards';

const cardRouter = Router();

cardRouter
  .post('/', createCard)
  .get('/', getCards)
  .delete('/:id', deleteCard);

export default cardRouter;
