import request from "supertest";
import appFactory from "../src/server";
import { Express } from 'express';

describe("Store specifications", () => {
  describe("Given an empty store", () => {
    let app: Express;

    beforeEach(() => app = appFactory());

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
  });
});

