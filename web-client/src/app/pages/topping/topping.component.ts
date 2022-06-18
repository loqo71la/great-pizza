import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/shared/models/pageable';
import { ToppingService } from 'src/app/services/topping.service';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'gp-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.css']
})
export class ToppingComponent implements OnInit {
  toppingPage!: Observable<Pageable<Topping>>;

  constructor(private toppingService: ToppingService, private router: Router) { }

  ngOnInit(): void {
    this.loadToppings();
  }

  loadToppings(page: number = 1) {
    this.toppingPage = this.toppingService.getAll(page)
      .pipe(catchError(response => {
        alert(response.error.message ?? environment.api.error);
        return of({ currentPage: 1, totalPages: 1, totalItems: 0, items: [] });
      }));
  }

  onActions(value: any) {
    if (value.action === 'add') this.router.navigate(['toppings', 'create']);
    if (value.action === 'edit') this.router.navigate(['toppings', value.item.id]);

    if (value.action === 'delete') {
      const response = confirm(`Are you sure you want to delete "${value.item.name}"`);
      if (response) this.toppingService.delete(value.item.id).subscribe(_ => this.loadToppings());
    }
  }
}
