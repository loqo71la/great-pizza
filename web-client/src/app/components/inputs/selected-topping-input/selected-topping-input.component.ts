import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToppingService } from 'src/app/services/topping.service';
import { Pageable } from 'src/app/shared/models/pageable';
import { Selectable } from 'src/app/shared/models/selectable';
import { Topping } from 'src/app/shared/models/topping';

const itemPerPage = 4;
@Component({
  selector: 'gp-selected-topping-input',
  templateUrl: './selected-topping-input.component.html',
  styleUrls: ['./selected-topping-input.component.css']
})
export class SelectedToppingInputComponent implements OnInit {
  @Output() toppingsChange = new EventEmitter<number[]>();
  @Input() toppings: number[];

  toppingPageable: Pageable<Topping>;
  items: Selectable[];

  constructor(private toppingService: ToppingService) { }

  ngOnInit(): void {
    this.loadToppings();
  }

  selectTopping(index: number) {
    const selected = !this.items[index].selected;
    const id = this.toppingPageable.items[index].id
    this.items[index].selected = selected;
    if (!selected) {
      this.toppings.splice(id, 1);
    } else if (!this.toppings.includes(id)) {
      this.toppings.push(id);
    }
    this.items[index].selected = selected;
    this.toppingsChange.emit(this.toppings);
  }

  loadToppings(page: number = 1): void {
    this.toppingService.getAll(page, itemPerPage)
      .subscribe(toppingPageable => {
        this.toppingPageable = toppingPageable;
        this.items = toppingPageable.items.map(item => ({ id: item.type, name: item.name, selected: this.toppings.includes(item.id) }))
      });
  }
}
