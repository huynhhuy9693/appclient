import { Dishes } from "../interfaces/dishes";
import { Restaurant } from "../interfaces/restaurant";

export class Offer {
    id: number;
    code: string;
    activedDate :Date;
    expiredDate: Date;
    discount: number;
    pricePromo: number;
    restaurant: Restaurant;
    dishes: Dishes[];
    createdAt: Date;
    updatedAt: Date;
}
