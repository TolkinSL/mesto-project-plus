import { Router } from 'express';
import {
  createUser, getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .get('/me', getCurrentUser)
  .get('/:id', getUserById)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar);

export default userRouter;
