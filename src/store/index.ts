class Store {
  private kvstore = new Map<String, String>();

  public set(pair: { key: String, value: String }) {
    this.kvstore.set(pair.key, pair.value);
  }

  public get(key: String): String | undefined {
    return this.kvstore.get(key);
  }
}

const instance = new Store();
export default instance;

