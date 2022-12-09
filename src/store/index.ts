import { Timeable } from './timeable';
import { Timer } from './timer';

export class Store {
  private readonly kvstore = new Map<string, Value>();

  public constructor(private readonly timer: Timeable) { }

  public set(pair: KVPair) {
    const value: Value = { value: pair.value };
    if (pair.ttl)
      value.ttl = this.timer.getTtl(pair.ttl)

    this.kvstore.set(pair.key, value);
  }

  public get(key: string): string | undefined {
    const result = this.kvstore.get(key);
    if (!result) return;
    if (!result.ttl) return result.value;
    if (result.ttl < this.timer.now()) {
      this.delete(key);
      return;
    }
    return result.value;
  }

  public delete(key: string): string | undefined {
    const result = this.kvstore.get(key);
    if (result) this.kvstore.delete(key);
    return result?.value;
  }
}

interface Value {
  value: string,
  ttl?: number,
}

interface KVPair {
  key: string,
  value: string,
  ttl?: number
}

let instance = new Store(new Timer());

export default function getInstance() {
  return instance;
}

export function setInstance(timer: Timeable) {
  instance = new Store(timer);
};

