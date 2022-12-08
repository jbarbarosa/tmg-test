class Stack {
  private stack: string[] = [];

  public add(item: string) {
    this.stack.push(item);
  }

  public pop(): string | undefined {
    return this.stack.pop();
  }

}

const instance = new Stack();

export default instance;

