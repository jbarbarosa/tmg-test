import request from "supertest";
import appFactory from "../src/server";
import { Express } from 'express';

describe("Store specifications", () => {
  describe("Given an empty store", () => {
    let app: Express;

    beforeEach(() => app = appFactory());

    describe("When getting a key", () => {
      it("Should return an empty value", () => {
        return request(app).get('/store?key=name').expect(204).expect({});
      });
    });

    describe("When adding a key-value pair to the store", () => {
      it("Should confirm that the pair was saved", () => {
        return request(app).post('/store').send({ key: 'name', value: 'bob' }).expect(201);
      });

      describe("And then retrieving the key", () => {
        it("Should return the corresponding value", async () => {
          await request(app).post('/store').send({ key: 'name', value: 'bob' });

          return request(app).get('/store?key=name').expect(200).expect({ value: 'bob' });
        });
      });
    });

    describe("When adding multiple key-value pairs", () => {
      it("Should return the corresponding values", async () => {
        await request(app).post('/store').send({ key: 'name', value: 'john' });
        await request(app).post('/store').send({ key: 'age', value: '30' });

        await request(app).get('/store?key=name').expect(200).expect({ value: 'john' });
        return request(app).get('/store?key=age').expect(200).expect({ value: '30' });
      });
    });
  });
});

