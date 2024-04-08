import { Router } from 'express';
import { login, createUser } from '../controllers/users';

const authRouter = Router();

authRouter
  .post('/signin', login)
  .post('/signup', createUser);

export default authRouter;
