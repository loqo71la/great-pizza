import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';

@Component({
  selector: 'gp-viewer-items',
  templateUrl: './viewer-items.component.html',
  styleUrls: ['./viewer-items.component.css']
})
export class ViewerItemsComponent<T> {
  @Output() openModal = new EventEmitter<any>();
  @Input() pageable: Pageable<T>;
  @Input() name: string;

  onOpenModal(): void {
    this.openModal.emit();
  }
}
