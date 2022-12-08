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

        it("Should return the corresponding value multiple times", async () => {
          await request(app).post('/store').send({ key: 'name', value: 'bob' });

          await request(app).get('/store?key=name').expect(200).expect({ value: 'bob' });
          return request(app).get('/store?key=name').expect(200).expect({ value: 'bob' });
        });
      });

      describe("And then overriding the key", () => {
        it("Should return the newest value", async () => {
          await request(app).post('/store').send({ key: 'address', value: 'street123' });
          await request(app).post('/store').send({ key: 'address', value: '456lane' });

          return request(app).get('/store?key=address').expect(200).expect({ value: '456lane' });
        });
      });

      describe("And the key-value pair has a ttl", () => {
        describe("When getting the value before the ttl", () => {
          it("Should return the corresponding value", async () => {
            await request(app).post('/store').send({ key: 'company', value: 'Dunder Mifflin', ttl: 30 });

            return request(app).get('/store?key=company').expect(200).expect({ value: 'Dunder Mifflin' });
          });
        });

        describe("When getting the value after the ttl", () => {
          it("Should return an empty value", async () => {
            await request(app).post('/store').send({ key: 'company', value: 'Dunder Mifflin', ttl: 30 });

            setTimeout(async () => { await request(app).get('/store?key=company').expect(204).expect({}) }, 40);
          });
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

    describe("When deleting a key-value pair", () => {
      it("Should return the corresponding value once", async () => {
        await request(app).post('/store').send({ key: 'company', value: 'Dunder Mifflin' });

        await request(app).delete('/store?key=company').expect(200).expect({ value: 'Dunder Mifflin' });
        return request(app).delete('/store?key=company').expect(204).expect({});
      });
    });
  });
});

