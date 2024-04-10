import { Router } from 'express';
import { login, createUser } from '../controllers/users';
import { valCreateUser, valLoginUser } from '../utils/validate';

const authRouter = Router();

authRouter
  .post('/signin', valLoginUser, login)
  .post('/signup', valCreateUser, createUser);

export default authRouter;
