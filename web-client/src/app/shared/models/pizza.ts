import { Topping } from "./topping";

export interface Pizza {
    id: number;
    name: string;
    size: string;
    type: string;
    price: number;
    createdDate?: Date;
    modifiedDate?: Date;
    toppings: number[];
}