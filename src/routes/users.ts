import { Router } from 'express';
import {
  createUser,
  getUsers,
} from '../controllers/users';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .post('/', createUser);

export default userRouter;
