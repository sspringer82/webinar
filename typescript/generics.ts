export default class Collection<T> {
  constructor(private items: T[]) {}

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T {
    return this.items[index];
  }
}
