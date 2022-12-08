class Store {
  private kvstore = new Map<String, String>();

  public set(pair: { key: String, value: String, ttl?: number }) {
    this.kvstore.set(pair.key, pair.value);
    if (pair.ttl) setTimeout(() => {
      this.kvstore.delete(pair.key)
    }, pair.ttl);
  }

  public get(key: String): String | undefined {
    return this.kvstore.get(key);
  }

  public delete(key: String): String | undefined {
    const result = this.kvstore.get(key);
    if (result) this.kvstore.delete(key);
    return result;
  }
}

const instance = new Store();
export default instance;

