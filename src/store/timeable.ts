export interface Timeable {
  now: () => number;

  getTtl: (ttl: number) => number;
}
