import { Timeable } from './timeable';

export class Timer implements Timeable {
  public now(): number {
    return Date.now();
  }

  getTtl(ttl: number): number {
    return Date.now() + ttl;
  }
}

