import { Rating } from "./rating";
import { Topping } from "./topping";

export interface Pizza {
  id: string;
  name: string;
  size: string;
  type: string;
  price: number;
  rating: number;
  ratings?: Rating[];
  createdDate?: Date;
  modifiedDate?: Date;
  toppings?: Topping[];
  toppingPrice?: number;
  toppingDetail?: string;
}