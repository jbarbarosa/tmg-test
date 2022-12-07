import express from 'express';
import instance from '../stack';

const stack = express.Router();

stack.put('/', (_, res) => {
  const result = instance.pop();
  if (result) return res.json({ value: result }).status(200);
  return res.sendStatus(204)
});

stack.post('/', (req, res) => {
  instance.add(req.body.value);
  return res.sendStatus(201);
});

export default stack;

