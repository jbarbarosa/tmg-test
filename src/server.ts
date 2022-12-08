import express, { Express } from 'express';
import { stack, store } from './routes';

function appFactory(): Express {
  const app = express();
  app.use(express.json());

  app.get('/', (_, res) => {
    return res.sendStatus(200)
  });

  app.use('/stack', stack);

  app.use('/store', store);

  return app;
}


export default appFactory;
