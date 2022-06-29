import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'gp-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.css']
})
export class ViewerPageComponent {
  @Output() actions = new EventEmitter<any>();
  @Input() pageable!: Pageable<any>;

  toStringSubItem(item: any) {
    return item.toppings?.map((topping: Topping) => topping.name).join(', ') || ' ';
  }

  loadTotal(item: any): number {
    return Number(item.price) + this.loadSubTotal(item);
  }

  hasSubItem(item: any): boolean {
    return item.toppings?.length || 0 > 0;
  }

  getLastModified(item: any): Date {
    return item.modifiedDate ? item.modifiedDate : item.createdDate;
  }

  open(item: any): void {
    this.actions.emit({ action: 'open', item })
  }

  private loadSubTotal(item: any): number {
    return item.toppings?.map((topping: any) => topping.price)
      .reduce((first: number, second: number) => first + second, 0) || 0;
  }
}
