import { CartItem } from "../interfaces/cart";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    dishesId: number;

    constructor(cartItem : CartItem){
        this.imageUrl = cartItem.imageURL;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.price;
        this.dishesId = cartItem.id;
    }
}
