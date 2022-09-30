import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';

@Component({
  selector: 'gp-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.css']
})
export class ViewerPageComponent {
  @Output() actions = new EventEmitter<any>();
  @Input() pageable!: Pageable<any>;

  open(item: any): void {
    this.actions.emit({ action: 'open', item })
  }

  loadTotal(item: any): number {
    return item.price + Number(item.toppingPrice || 0)
  }
}
