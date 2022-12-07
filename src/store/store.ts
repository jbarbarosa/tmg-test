class Store {
  private stack: String[] = [];

  public add(item: String) {
    this.stack.push(item);
  }

  public pop(): String | undefined {
    return this.stack.pop();
  }
}

const instance = new Store();
export default instance;

