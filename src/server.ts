import express, { Express } from 'express';
import { stack, store } from './routes';
import { setInstance } from './store';
import { Timeable } from './store/timeable';

function appFactory(timer?: Timeable): Express {
  if (timer) setInstance(timer);

  const app = express();
  app.use(express.json());
  app.use('/stack', stack);
  app.use('/store', store);
  return app;
}

export default appFactory;
