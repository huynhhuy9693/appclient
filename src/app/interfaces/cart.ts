import { Dishes } from "./dishes";

export class CartItem {
    public id: number;
    public restanrantId: number;
    public name: string;
    public price: number;
    public imageURL: string;
    public unitPrice: string;

    public quantity: number;

    constructor(dishes : Dishes){ 
        this.id = dishes.id;
        this.name = dishes.name;
        this.price = dishes.price;
        this.imageURL = dishes.imageURL;
        this.unitPrice = dishes.unit;

        this.quantity = dishes.quantity;
    }

}

