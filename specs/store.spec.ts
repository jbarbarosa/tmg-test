import app from '../src/server';
import request from 'supertest';

describe("Store specifications", () => {
  describe("Given an empty store", () => {
    describe("When pulling from the store", () => {
      it("Should return an empty result", () => {
        return request(app)
          .put('/store')
          .expect(204)
      });
    });
  });
});
