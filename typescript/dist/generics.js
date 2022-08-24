export default class Collection {
    items;
    constructor(items) {
        this.items = items;
    }
    addItem(item) {
        this.items.push(item);
    }
    getItem(index) {
        return this.items[index];
    }
}
