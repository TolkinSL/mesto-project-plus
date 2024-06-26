import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import handleErrors from './middleware/handleErrors';
import router from './routes/index';
import config from './config';
import authRouter from './routes/auth';
import auth from './middleware/auth'; // Путь к файлу конфигурации
import helmet from 'helmet';
import { errorLogger, requestLogger } from './middleware/logger';
import { errors } from 'celebrate';

// const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

// app.use((req: Request | any, res: Response, next: NextFunction) => {
//   req.user = {
//     _id: '660f32a42dab5af1c197c792',
//   };
//   next();
// });

app.use(authRouter);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Подключились к базе');
    await app.listen(config.PORT);
    console.log('Сервер запущен на порту: ', config.PORT);
  } catch (err) {
    console.log(err);
  }
};

connect();
