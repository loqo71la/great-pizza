import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pageable } from 'src/app/shared/models/pageable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gp-viewer-items',
  templateUrl: './viewer-items.component.html',
  styleUrls: ['./viewer-items.component.css']
})
export class ViewerItemsComponent {
  @Output() selectedPage = new EventEmitter<any>();
  @Output() actions = new EventEmitter<any>();
  @Input() pageable!: Pageable<any>;
  @Input() sorters!: any[];
  @Input() sort!: string;
  @Input() name!: string;

  get start(): number {
    return this.section() + 1;
  }

  get end(): number {
    return this.section() + this.pageable.items.length;
  }

  onSelect(sort: string) {
    this.selectedPage.emit({ page: this.pageable.currentPage, sort });
  }

  moveLeft(): void {
    this.selectedPage.emit({ page: this.pageable.currentPage - 1, sort: this.sort });
  }

  moveRight(): void {
    this.selectedPage.emit({ page: this.pageable.currentPage + 1, sort: this.sort });
  }

  add(): void {
    this.actions.emit({ action: 'add' });
  }

  private section(): number {
    return (this.pageable.currentPage - 1) * environment.api.limit;
  }
}
