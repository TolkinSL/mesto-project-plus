import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import handleErrors from './middleware/handleErrors';
import router from './routes/index';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req: Request | any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '660f32a42dab5af1c197c792',
  };
  next();
});

app.use(router);
app.use(handleErrors);

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.log('Подключились к базе');
    await app.listen(PORT);
    console.log('Сервер запущен на порту: ', PORT);
  } catch (err) {
    console.log(err);
  }
};

connect();
