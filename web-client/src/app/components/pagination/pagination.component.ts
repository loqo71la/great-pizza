import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() selectedPage = new EventEmitter<number>();
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  pageList!: number[];

  ngOnInit(): void {
    this.pageList = [...Array(this.totalPages).keys()].map((_, page) => page + 1);
  }

  select(page: number): void {
    this.selectedPage.emit(page);
  }

  moveLeft(): void {
    if (this.hasLeft()) this.select(this.currentPage - 1);
  }

  moveRight(): void {
    if (this.hasRight()) this.select(this.currentPage + 1);
  }

  hasLeft(): boolean {
    return this.currentPage > 1;
  }

  hasRight(): boolean {
    return this.currentPage < this.totalPages;
  }
}
