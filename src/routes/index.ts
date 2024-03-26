import { Router, Request, Response } from 'express';
import { constants } from 'http2';
import userRouter from './users';
import cardRouter from './cards';

const router = Router();

router
  .use('/users', userRouter)
  .use('/cards', cardRouter)
  .use('*', (req: Request, res: Response) => res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Запрашиваемый ресурс не найден' }));

export default router;
