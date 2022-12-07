import appFactory from '../src/server';
import request from 'supertest';
import { Express } from 'express';

describe("Stack specifications", () => {
  let app: Express;

  beforeEach(() => app = appFactory())

  describe("Given an empty stack", () => {
    describe("When adding 'Hello' to the stack", () => {
      describe("And pulling from the stack", () => {
        it("Should get the value 'Hello'", async () => {
          await request(app).post('/stack').send({ value: 'Hello' }).expect(201);

          return request(app).put('/stack').expect(200).expect({ value: 'Hello' });
        });
      });

      describe("And again adding 'World' to the stack", () => {

        it("Should get the values 'World' and 'Hello' in sequence", async () => {
          await request(app).post('/stack').send({ value: 'Hello' }).expect(201);
          await request(app).post('/stack').send({ value: 'World' }).expect(201);

          await request(app).put('/stack').expect(200).expect({ value: 'World' });
          return request(app).put('/stack').expect(200).expect({ value: 'Hello' });
        });
      });
    });

    describe("When pulling from the stack", () => {
      it("Should return an empty result", () => {
        return request(app).put('/stack').expect(204);
      });
    });
  });
});
