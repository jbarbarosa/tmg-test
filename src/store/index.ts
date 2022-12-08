class Store {
  private kvstore = new Map<string, string>();

  public set(pair: { key: string, value: string, ttl?: number }) {
    this.kvstore.set(pair.key, pair.value);
    if (pair.ttl) setTimeout(() => {
      this.kvstore.delete(pair.key)
    }, pair.ttl);
  }

  public get(key: string): string | undefined {
    return this.kvstore.get(key);
  }

  public delete(key: string): string | undefined {
    const result = this.kvstore.get(key);
    if (result) this.kvstore.delete(key);
    return result;
  }
}

const instance = new Store();
export default instance;

