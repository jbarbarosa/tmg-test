import express from 'express';
import { stack } from './routes';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  return res.sendStatus(200)
});

app.use('/stack', stack);

export default app;

