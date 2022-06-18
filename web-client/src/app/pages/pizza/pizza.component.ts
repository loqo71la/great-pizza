import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/shared/models/pageable';
import { Pizza } from 'src/app/shared/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'gp-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  pizzaPage!: Observable<Pageable<Pizza>>;

  constructor(private pizzaService: PizzaService, private router: Router) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(page: number = 1): void {
    this.pizzaPage = this.pizzaService.getAll(page)
      .pipe(catchError(response => {
        alert(response.error.message ?? environment.api.error);
        return of({ currentPage: 1, totalPages: 1, totalItems: 0, items: [] });
      }));
  }

  onActions(value: any) {
    if (value.action === 'add') this.router.navigate(['pizzas', 'create']);
    if (value.action === 'edit') this.router.navigate(['pizzas', value.item.id]);

    if (value.action === 'delete') {
      const response = confirm(`Are you sure you want to delete "${value.item.name}"`);
      if (response) this.pizzaService.delete(value.item.id).subscribe(_ => this.loadPizzas());
    }
  }
}
