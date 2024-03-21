import express, { Request, Response } from 'express';

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello world</h1>`);
});