import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'gp-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.css']
})
export class ViewerPageComponent<T> {
  @Output() actions = new EventEmitter<any>();
  @Input() pageable: Pageable<T>;

  toStringToppings(item: any) {
    return item.toppings?.map((topping: Topping) => topping.name).join('') || ' ';
  }
  
  getLastModified(pizza: any) {
    return pizza.modifiedDate ? pizza.modifiedDate : pizza.createdDate;
  }
}
