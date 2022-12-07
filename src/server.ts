import express from 'express';
import { store } from './routes';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  return res.sendStatus(200)
});

app.use('/store', store);

export default app;

