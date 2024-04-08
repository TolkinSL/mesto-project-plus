import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AuthError from '../utils/AuthError'; // Путь к файлу конфигурации

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthError('Неверный JWT токен');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, config.SECRET_KEY);
    (req as any).user = payload;
    return next();
  } catch (error) {
    return next(new AuthError('Нужна авторизация'));
  }
};
