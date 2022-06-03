import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { PizzaService } from 'src/app/services/pizza.service';
import { Pageable } from 'src/app/shared/models/pageable';
import { Pizza } from 'src/app/shared/models/pizza';

const DefaultPizzas = ['pz1', 'pz2', 'pz3', 'pz4'];

@Component({
  selector: 'gp-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  pizzaPageable!: Pageable<Pizza>;
  error!: string;
  modal!: Modal;
  pizza!: Pizza;
  pizzas: string[];
  name: string;

  constructor(private pizzaService: PizzaService) {
    this.pizzas = DefaultPizzas;
    this.name = 'Pizzas';
    this.cleanPizza();
  }

  ngOnInit(): void {
    this.loadPizzas();
    this.modal = new Modal(document.getElementById('modal') as HTMLElement);
  }

  onOpenModal() {
    this.cleanPizza();
    this.modal?.show();
  }

  onActions(value: any) {
    const current = this.pizzaPageable.items[value.index];
    if (value.action === 'edit') {
      this.pizza = { ...current, toppings: current?.toppings.map((topping: any) => topping.id) };
      this.modal.show();
    }

    if (value.action === 'delete') {
      var response = confirm(`Are you sure you want to delete "${current.name}"`);
      if (response) this.pizzaService.delete(current.id).subscribe(_ => this.loadPizzas());
    }
  }

  onSuccess(): void {
    const next = (response: any) => {
      if (this.pizza.toppings) {
        this.pizzaService.assign(this.loadPizzaId(response), this.pizza.toppings).
          subscribe(_ => this.closeModal());
      } else this.closeModal();
    };
    const error = (response: any) => {
      this.error = response.error.message;
      console.log(response.error.message);
    }

    if (!this.pizza.name) {
      this.error = 'Pizza name can\'t be empty';
      return;
    }

    if (this.pizza.id) this.pizzaService.update(this.pizza).subscribe({ next, error });
    else this.pizzaService.add(this.pizza).subscribe({ next, error });
  }

  loadPizzas(): void {
    this.pizzaService.getAll().subscribe(pizzaPageable => this.pizzaPageable = pizzaPageable);
  }

  private loadPizzaId(response: any): number {
    if (this.pizza.id) return this.pizza.id;
    const match = response.message.match(/.+pizza\/(?<pizzaId>\d+)/);
    return Number(match.groups['pizzaId'] || 0);
  }

  private closeModal(): void {
    this.modal.hide();
    this.loadPizzas();
  }

  private cleanPizza(): void {
    this.pizza = { id: 0, name: '', type: this.pizzas[0], size: '', price: 0, toppings: [] };
    this.error = '';
  }
}
