import express from 'express';
import instance from '../store/store';

const store = express.Router();

store.put('/', (_, res) => {
  const result = instance.pop();
  if (result) return res.json({ value: result }).status(200);
  return res.sendStatus(204)
});

store.post('/', (req, res) => {
  instance.add(req.body.value);
  return res.sendStatus(201);
});

export default store;

