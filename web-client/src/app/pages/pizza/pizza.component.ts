import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { PizzaService } from 'src/app/services/pizza.service';
import { Pageable } from 'src/app/shared/models/pageable';
import { Pizza } from 'src/app/shared/models/pizza';
import { Response } from 'src/app/shared/models/response';

const DefaultPizzas = ['pz1', 'pz2', 'pz3', 'pz4'];

@Component({
  selector: 'gp-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  pizzaPageable: Pageable<Pizza>;
  errorResponse: Response;
  pizzas: string[];
  modal: Modal;
  pizza: Pizza;
  name: string;

  constructor(private pizzaService: PizzaService) {
    this.pizzas = DefaultPizzas;
    this.name = 'Pizzas';
    this.cleanPizza();
  }

  ngOnInit(): void {
    this.loadPizzas();
    this.modal = new Modal(document.getElementById('modal'));
  }

  onOpenModal() {
    this.cleanPizza();
    this.modal.show();
  }

  onActions(type: any) {

  }

  add() {
    this.pizzaService.add(this.pizza)
      .subscribe(
        _ => {
          this.modal.hide();
          this.loadPizzas();
        }, response => {
          this.errorResponse = response.error;
          console.log(this.errorResponse.message);
        }
      );
  }

  private loadPizzas(): void {
    this.pizzaService.getAll().subscribe(pizzaPage => this.pizzaPageable = pizzaPage);
  }

  private cleanPizza(): void {
    this.pizza = { id: 0, name: '', type: this.pizzas[0], size: '', price: 0, toppings: [] };
  }
}
