import { Pizza } from '../models/pizza';
import { Topping } from '../models/topping';

export abstract class MapperUtil {

  static toPizza(item: any): Pizza {
    const pizza: Pizza = {
      id: item.id,
      name: item.name,
      size: item.size,
      type: item.type,
      price: item.price,
      toppings: item.toppings?.map(MapperUtil.toTopping)
    };
    if (item.createdDate) pizza.createdDate = new Date(item.createdDate);
    if (item.modifiedDate) pizza.modifiedDate = new Date(item.modifiedDate);
    return pizza
  }

  static toTopping(item: any): Topping {
    const topping: Topping = {
      id: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
    };
    if (item.createdDate) topping.createdDate = new Date(item.createdDate);
    if (item.modifiedDate) topping.modifiedDate = new Date(item.modifiedDate);
    return topping
  }
}