import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { ToppingService } from 'src/app/services/topping.service';
import { Response } from 'src/app/shared/models/response';
import { Topping } from 'src/app/shared/models/topping';
import { Pageable } from 'src/app/shared/models/pageable';
import { Selectable } from 'src/app/shared/models/selectable';

const DefaultToppings = ['tp1', 'tp2', 'tp3', 'tp4', 'tp5', 'tp6', 'tp6', 'tp7', 'tp8', 'tp9', 'tp10', 'tp11', 'tp12'];
@Component({
  selector: 'gp-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.css']
})
export class ToppingComponent implements OnInit {
  toppingPageable: Pageable<Topping>;
  selectables: Selectable[];
  errorResponse: Response;
  toppings: string[];
  topping: Topping;
  modal: Modal;

  constructor(private toppingService: ToppingService) {
    this.selectables = Array.from({ length: 12 }, (_, i) => ({ id: `tp${i + 1}`, selected: false }));
    this.toppings = DefaultToppings;
    this.cleanTopping();
  }

  ngOnInit(): void {
    this.loadToppings();
    this.modal = new Modal(document.getElementById('modal'));
  }

  onOpenModal() {
    this.cleanTopping();
    this.modal.show();
  }

  onAction(type: any) {

  }

  add() {
    this.toppingService.add(this.topping)
      .subscribe(
        _ => {
          this.modal.hide();
          this.loadToppings();
        }, response => {
          this.errorResponse = response.error;
          console.log(this.errorResponse.message);
        }
      );

  }

  private loadToppings() {
    this.toppingService.getAll().subscribe(toppingPage => this.toppingPageable = toppingPage);
  }

  private cleanTopping() {
    this.topping = { id: 0, name: '', type: this.toppings[0], price: 0 };
  }
}
