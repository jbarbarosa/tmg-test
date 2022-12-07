import app from '../src/server';
import request from 'supertest';

describe("Store specifications", () => {
  describe("Given an empty store", () => {

    describe("When adding 'Hello' to the store", () => {
      describe("And pulling from the store", () => {
        it("Should get the value 'Hello'", async () => {
          await request(app).post('/store').send({ value: 'Hello' }).expect(201);

          return request(app).put('/store').expect(200).expect({ value: 'Hello' });
        });
      });

      describe("And again adding 'World' to the store", () => {

        it("Should get the values 'World' and 'Hello' in sequence", async () => {
          await request(app).post('/store').send({ value: 'Hello' }).expect(201);
          await request(app).post('/store').send({ value: 'World' }).expect(201);

          await request(app).put('/store').expect(200).expect({ value: 'World' });
          return request(app).put('/store').expect(200).expect({ value: 'Hello' });
        });
      });
    });

    describe("When pulling from the store", () => {
      it("Should return an empty result", () => {
        return request(app).put('/store').expect(204);
      });
    });
  });
});
