import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';

@Component({
  selector: 'gp-viewer-items',
  templateUrl: './viewer-items.component.html',
  styleUrls: ['./viewer-items.component.css']
})
export class ViewerItemsComponent {
  @Output() actions = new EventEmitter<any>();
  @Input() pageable!: Pageable<any>;
  @Input() name!: string;

  add(): void {
    this.actions.emit({action: 'add'});
  }
}
