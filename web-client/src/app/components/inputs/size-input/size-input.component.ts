import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Selectable } from 'src/app/shared/models/selectable';

const DefaultSizes: Selectable[] = [
  { id: 'S', selected: false },
  { id: 'M', selected: false },
  { id: 'L', selected: false },
  { id: 'XL', selected: false }
];

@Component({
  selector: 'gp-size-input',
  templateUrl: './size-input.component.html',
  styleUrls: ['./size-input.component.css']
})
export class SizeInputComponent implements OnChanges {
  @Output() sizeChange = new EventEmitter<string>();
  @Input() size: string;
  sizes: Selectable[];

  constructor() {
    this.sizes = DefaultSizes;
  }

  ngOnChanges(): void {
    this.sizes.forEach(size => size.selected = size.id === this.size);
  }

  select(size: Selectable): void {
    this.sizes.forEach(current => current.selected = false);
    this.sizeChange.emit(size.id);
    size.selected = true;
  }
}
