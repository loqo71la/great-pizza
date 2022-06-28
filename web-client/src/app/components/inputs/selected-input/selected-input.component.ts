import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
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
export class SelectedInputComponent implements ControlValueAccessor, OnChanges {
  @Input() containerStyle: string = 'd-flex flex-wrap gap-1';
  @Input() itemTemplate!: TemplateRef<Selectable>;
  @Input() items!: Selectable[];
  value!: string | string[];

  private onTouched!: Function;
  private onChanged!: Function;

  ngOnChanges(_: SimpleChanges): void {
    this.loadItems();
  }

  select(item: Selectable): void {
    const { value, isSelected } = item;
    if (Array.isArray(this.value)) {
      this.value = isSelected ? this.value.filter(data => data !== value) : [...this.value, value];
    } else {
      this.items.forEach(item => item.isSelected = false);
      this.value = isSelected ? '' : value;
    }
    item.isSelected = !isSelected;

    this.onTouched();
    this.onChanged(this.value);
  }

  writeValue(value: string | string[]): void {
    this.value = value;
    this.loadItems();
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private loadItems(): void {
    this.items?.filter(item => Array.isArray(this.value) ? this.value.includes(item.value) : item.value === this.value)
      .forEach(item => item.isSelected = true);
  }
}
