"use strict";
class DataStore {
    constructor() {
        this.items = [];
        this.maxSize = 30;
        this.currentSize = 0;
    }
    add(item) {
        if (this.currentSize === this.maxSize) {
            throw new Error("Storage is full");
        }
        else {
            this.items.push(item);
            this.currentSize++;
        }
    }
    remove(toRemove) {
        const originalSize = this.items.length;
        this.items = this.items.filter(item => item !== toRemove);
        this.currentSize -= originalSize - this.items.length;
    }
    getAll() {
        return this.items;
    }
}
