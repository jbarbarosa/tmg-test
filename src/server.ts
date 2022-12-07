import express, { Express } from 'express';
import { stack } from './routes';

function appFactory(): Express {
  const app = express();
  app.use(express.json());

  app.get('/', (_, res) => {
    return res.sendStatus(200)
  });

  app.use('/stack', stack);

  return app;
}


export default appFactory;
