class DataStore<T> {
    private items: T[] = [];
    private maxSize: number = 30;
    private currentSize: number = 0;

    add(item: T): void {
        if (this.currentSize === this.maxSize) {
            throw new Error("Storage is full");
        } else {
            this.items.push(item);
            this.currentSize++;
        }
    }

    remove(toRemove: T): void {
        const originalSize = this.items.length;
        this.items = this.items.filter(item => item !== toRemove);
        this.currentSize -= originalSize - this.items.length;
    }

    getAll(): T[] {
        return this.items;
    }
}