import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Selectable } from 'src/app/shared/models/selectable';

@Component({
  selector: 'gp-selected-input',
  templateUrl: './selected-input.component.html',
  styleUrls: ['./selected-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectedInputComponent),
      multi: true
    }
  ]
})
export class SelectedInputComponent implements ControlValueAccessor, OnInit {
  @Input() headers!: string[];
  items!: Selectable[];
  value!: string;
  
  private onTouched!: Function;
  private onChanged!: Function;

  ngOnInit(): void {
    this.items = this.headers.map(header => ({ id: header, selected: this.value === header }));
  }

  select(item: Selectable): void {
    this.items.forEach(current => current.selected = false);
    item.selected = true;

    this.onTouched();
    this.value = item.id;
    this.onChanged(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
