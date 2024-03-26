import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
} from '../controllers/users';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .post('/', createUser)
  .get('/:id', getUserById);

export default userRouter;
