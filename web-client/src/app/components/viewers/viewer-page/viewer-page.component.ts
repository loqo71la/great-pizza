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

  toStringSubItem(item: any) {
    return item.toppings?.map((topping: Topping) => topping.name).join(', ') || ' ';
  }

  loadSubTotal(item: any): number {
      return item.toppings?.map(topping => topping.price)
      .reduce((first, second) => first + second, 0) || 0;
  }

  loadTotal(item: any): number {
    return Number(item.price) + this.loadSubTotal(item);
  }

  hasSubItem(item: any): boolean {
    return item.toppings?.length || 0 > 0;
  }

  getLastModified(pizza: any) {
    return pizza.modifiedDate ? pizza.modifiedDate : pizza.createdDate;
  }

  edit(index: number): void {
    this.actions.emit({ action: 'edit', index })
  }

  delete(index: number): void {
    this.actions.emit({ action: 'delete', index })
  }
}
