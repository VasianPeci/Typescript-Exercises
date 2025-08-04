"use strict";
class Repository {
    constructor() {
        this.items = [];
        this.capacity = 10;
    }
    add(item) {
        if (this.items.length < this.capacity) {
            this.items.push(item);
            return;
        }
        console.log("Maximum capacity reached!");
    }
    getById(id) {
        for (const i of this.items) {
            if (i.id === id) {
                return i;
            }
        }
        return null;
    }
    getAll() {
        return this.items;
    }
    remove(id) {
        const originalLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        if (originalLength !== this.items.length) {
            return true;
        }
        return false;
    }
    update(id, prop, value) {
        let updated = false;
        this.items.forEach(item => {
            if (item.id === id) {
                item[prop] = value;
                updated = true;
            }
        });
        return updated;
    }
}
