import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/shared/models/pageable';
import { ToppingService } from 'src/app/services/topping.service';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'gp-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.css']
})
export class ToppingListComponent implements OnInit {
  toppingPage!: Observable<Pageable<Topping>>;
  sorters = environment.sorters.toppings;
  sort = this.sorters[0].id;

  constructor(private toppingService: ToppingService, private router: Router) { }

  ngOnInit(): void {
    this.loadToppings({ page: 1, sort: this.sort });
  }

  loadToppings(data: any) {
    this.sort = data.sort;
    this.toppingPage = this.toppingService.getAll(data.page, environment.api.limit, data.sort)
      .pipe(catchError(response => {
        alert(response.error.message ?? environment.api.error);
        return of({ currentPage: 1, totalPages: 1, totalItems: 0, items: [] });
      }));
  }

  onActions(value: any) {
    if (value.action === 'add') this.router.navigate(['toppings', 'create']);
    if (value.action === 'open') this.router.navigate(['toppings', value.item.id]);
  }
}
