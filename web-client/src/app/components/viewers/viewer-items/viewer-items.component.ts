import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gp-viewer-items',
  templateUrl: './viewer-items.component.html',
  styleUrls: ['./viewer-items.component.css']
})
export class ViewerItemsComponent {
  @Output() selectedPage = new EventEmitter<number>();
  @Output() actions = new EventEmitter<any>();
  @Input() pageable!: Pageable<any>;
  @Input() name!: string;

  get start(): number {
    return this.section() + 1;
  }

  get end(): number {
    return this.section() + this.pageable.items.length;
  }

  moveLeft(): void {
    this.selectedPage.emit(this.pageable.currentPage - 1);
  }

  moveRight(): void {
    this.selectedPage.emit(this.pageable.currentPage + 1);
  }

  add(): void {
    this.actions.emit({action: 'add'});
  }

  private section(): number {
    return (this.pageable.currentPage - 1) * environment.api.limit;
  }
}
