interface Entity {
    id: number
}

class Repository<T extends Entity> {
    private items: T[] = [];
    private capacity = 10;

    add(item: T): void {
        if(this.items.length < this.capacity) {
            this.items.push(item);
            return;
        }  
        console.log("Maximum capacity reached!");
    }

    getById(id: number): T | null{
        for(const i of this.items) {
            if(i.id === id) {
                return i;
            }
        }
        return null;
    }

    getAll(): T[] {
        return this.items;
    }

    remove(id: number): boolean {
        const originalLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);

        if(originalLength !== this.items.length) {
            return true;
        }
        return false;
    }

    update<Key extends keyof T>(id: number, prop: Key, value: T[Key]): boolean {
        let updated = false;

        this.items.forEach(item => {
            if(item.id === id) {
                item[prop] = value;
                updated = true;
            }
        })

        return updated;
    }
}