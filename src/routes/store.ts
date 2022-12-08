import express from 'express';
import instance from '../store';

const store = express.Router();

store.post('/', (req, res) => {
  instance.set(req.body);
  return res.sendStatus(201);
});

store.get('/', (req, res) => {
  const result = instance.get(req.query.key as string)
  if (result) return res.status(200).json({ value: result });
});

export default store;

