import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/shared/models/pageable';
import { Pizza } from 'src/app/shared/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'gp-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  pizzaPage!: Observable<Pageable<Pizza>>;
  sorters = environment.sorters.pizzas;
  sort = this.sorters[0].id;

  constructor(private pizzaService: PizzaService, private router: Router) { }

  ngOnInit(): void {
    this.loadPizzas({ page: 1, sort: this.sort });
  }

  loadPizzas(data: any): void {
    this.sort = data.sort;
    this.pizzaPage = this.pizzaService.getAll(data.page, environment.api.limit, data.sort)
      .pipe(catchError(response => {
        alert(response.error.message ?? environment.api.error);
        return of({ currentPage: 1, totalPages: 1, totalItems: 0, items: [] });
      }));
  }

  onActions(value: any) {
    if (value.action === 'add') this.router.navigate(['pizzas', 'create']);
    if (value.action === 'open') this.router.navigate(['pizzas', value.item.id]);
  }
}
