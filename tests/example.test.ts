import request from 'supertest';
import app from '../src/server';

it('GET /', () => {
  return request(app).get('/').expect('Hello')
});
