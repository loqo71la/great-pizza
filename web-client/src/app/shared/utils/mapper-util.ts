import { Pizza } from '../models/pizza';
import { Topping } from '../models/topping';

export abstract class MapperUtil {

  static toPizza(item: any): Pizza {
    const pizza: Pizza = {
      id: item.id,
      name: item.name,
      size: item.size,
      type: item.type,
      ratings: item.ratings,
      price: Number(item.price),
      rating: Number(item.rating),
      toppings: item.toppings || '',
      toppingPrice: item.toppingPrice,
      toppingDetail: item.toppingDetail
    };
    if (item.createdAt) pizza.createdDate = new Date(item.createdAt);
    if (item.updatedAt) pizza.modifiedDate = new Date(item.updatedAt);
    return pizza
  }

  static toTopping(item: any): Topping {
    const topping: Topping = {
      id: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
    };
    if (item.createdAt) topping.createdDate = new Date(item.createdAt);
    if (item.updatedAt) topping.modifiedDate = new Date(item.updatedAt);
    return topping
  }
}