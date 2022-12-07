import express from 'express';
import { store } from './routes';

const app = express();

app.get('/', (_, res) => {
  return res.send(200)
});

app.use('/store', store);

export default app;

