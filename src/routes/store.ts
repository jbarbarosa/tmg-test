import express from 'express';
const store = express.Router();

store.put('/', (_, res) => {
  return res.send(204)
});

export default store;

