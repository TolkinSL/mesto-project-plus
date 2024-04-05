import { Router } from 'express';
import {
  createUser, getUsers, getUserById, updateUser, updateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .post('/', createUser)
  .get('/:id', getUserById)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar);

export default userRouter;
