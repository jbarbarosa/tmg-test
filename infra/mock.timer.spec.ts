import { Timeable } from "../src/store/timeable";

export class MockedExpiredTimer implements Timeable {
  private ttl: number;

  now(): number {
    return Date.now() + this.ttl;
  }

  getTtl(ttl: number): number {
    this.ttl = ttl;
    return Date.now() + ttl;
  }
}
