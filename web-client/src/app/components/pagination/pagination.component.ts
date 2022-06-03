import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

enum Direction {
  Left,
  Right
}

interface Page {
  value: string;
  action: (page: number) => void;
  style: (page: number) => string;
}

@Component({
  selector: 'gp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() changedPage = new EventEmitter<number>();
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  pageList!: Page[];

  ngOnInit(): void {
    this.pageList = [...Array(this.totalPages).keys()]
      .map(index => ({ value: String(index + 1), action: page => this.changedPage.emit(page), style: page => page == this.currentPage ? 'active' : '' }));
    this.pageList.splice(0, 0, { value: '&laquo;', action: _ => this.movePage(Direction.Left), style: _ => this.loadStyle(Direction.Left) })
    this.pageList.push({ value: '&raquo;', action: _ => this.movePage(Direction.Right), style: _ => this.loadStyle(Direction.Right) })
  }

  movePage(direction: Direction): void {
    if (this.isDisabled(direction)) return;
    if (direction == Direction.Left) this.currentPage--;
    else this.currentPage++;
    this.changedPage.emit(this.currentPage);
  }

  loadStyle(direction: Direction): string {
    return this.isDisabled(direction) ? 'disabled' : '';
  }

  private isDisabled(direction: Direction): boolean {
    return this.totalPages == 1 || direction == Direction.Left ? this.currentPage == 1 : this.currentPage == this.totalPages;
  }
}
