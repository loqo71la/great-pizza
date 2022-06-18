import { environment } from 'src/environments/environment';
import { Selectable } from '../models/selectable';

type HeaderType = 'sizes' | 'pizzas' | 'toppings';

export abstract class DataUtil {

  static buildHeaders(type: HeaderType): Selectable[] {
    const headers = environment.headers[type];
    return headers.map(header => ({ value: header, isSelected: false }));
  }
}