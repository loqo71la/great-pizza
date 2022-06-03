import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gp-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.css']
})
export class PriceInputComponent {
  @Output() priceChange = new EventEmitter<number>();
  @Input() price!: number;

  setPrice(price: number): void {
    this.price = price;
    this.priceChange.emit(this.price);
  }

  onFocus(event: any) {
    event.target.select()
  }

  onBlur(): void {
    if (this.price == null) this.price = 0;
  }
}
