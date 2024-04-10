import { Router } from 'express';
import {
  createUser, getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users';
import { valUpdateAvatar, valUpdateUser, valUserById } from '../utils/validate';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .get('/me', getCurrentUser)
  .get('/:id', valUserById, getUserById)
  .patch('/me', valUpdateUser, updateUser)
  .patch('/me/avatar', valUpdateAvatar, updateAvatar);

export default userRouter;
