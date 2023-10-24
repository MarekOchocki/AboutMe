
export class Item {
    name: string;
    count: number;

    public constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
    
    public multiply(multiplier: number): Item {
        return new Item(this.name, this.count * multiplier);
    }

    public divide(divisor: number): Item {
        return new Item(this.name, this.count / divisor);
    }
}
