import { Router } from 'express';
import { createCard, getCards } from '../controllers/cards';

const cardRouter = Router();

cardRouter
  .post('/', createCard)
  .get('/', getCards);

export default cardRouter;
