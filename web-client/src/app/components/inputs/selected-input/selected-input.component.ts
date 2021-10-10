import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Selectable } from 'src/app/shared/models/selectable';

@Component({
  selector: 'gp-selected-input',
  templateUrl: './selected-input.component.html',
  styleUrls: ['./selected-input.component.css']
})
export class SelectedInputComponent implements OnInit {
  @Output() typeChange = new EventEmitter<string>();
  @Input() headers: string[];
  @Input() type: string;
  items: Selectable[];

  ngOnInit(): void {
    this.items = this.headers.map(header => ({ id: header, selected: this.type === header }));
  }

  select(item: Selectable): void {
    this.items.forEach(current => current.selected = false);
    this.typeChange.emit(item.id);
    item.selected = true;
  }
}
