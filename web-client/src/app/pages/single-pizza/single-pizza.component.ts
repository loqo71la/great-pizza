import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { DataUtil } from 'src/app/shared/utils/data-util';
import { Pageable } from 'src/app/shared/models/pageable';
import { Pizza } from 'src/app/shared/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { Topping } from 'src/app/shared/models/topping';
import { ToppingService } from 'src/app/services/topping.service';
import { Selectable } from 'src/app/shared/models/selectable';

type Control = 'name' | 'price' | 'type' | 'size' | 'toppings';

@Component({
  selector: 'gp-single-pizza',
  templateUrl: './single-pizza.component.html',
  styleUrls: ['./single-pizza.component.css']
})
export class SinglePizzaComponent implements OnInit {
  pizzaHeaders: Selectable[] = DataUtil.buildHeaders('pizzas');
  sizeHeaders: Selectable[] = DataUtil.buildHeaders('sizes');
  toppingHeaders: Selectable[] = [];
  isSubmitLoading: boolean = false;
  isDeleteLoading: boolean = false;

  toppingPage!: Pageable<Topping>;
  form!: FormGroup;
  pizza!: Pizza;

  constructor(private pizzaService: PizzaService,
    private toppingService: ToppingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData()
    this.loadTopping();

    const pizzaId = this.route.snapshot.paramMap.get('pizzaId');
    if (pizzaId === 'create') {
      this.pizza = { ...this.form.value, id: 0 };
      return;
    }

    this.pizzaService.getById(pizzaId!)
      .subscribe({
        next: pizza => {
          const toppings = pizza.toppings?.map(topping => String(topping.id));
          this.form.patchValue({ ...pizza, toppings });
          this.pizza = pizza;
        },
        error: response => {
          alert(response.error.message ?? environment.api.error);
          this.cancel();
        }
      });
  }

  getControl(name: Control): FormControl {
    return this.form.get(name) as FormControl;
  }

  delete(): void {
    const response = confirm(`Are you sure you want to delete "${this.pizza.name}"`);
    if (!response) return;

    this.isDeleteLoading = true;
    this.pizzaService.delete(this.pizza.id)
      .subscribe(_ => {
        this.isDeleteLoading = false;
        this.cancel();
      });
  }

  loadTopping(page: number = 1): void {
    this.toppingService.getAll(page)
      .subscribe(toppingPage => {
        this.toppingPage = toppingPage;
        this.toppingHeaders = toppingPage.items.map(topping =>
          ({ value: String(topping.id), isSelected: false, data: topping })
        );
      })
  }

  submit(): void {
    const error = (response: any) => {
      alert(response.error.message ?? environment.api.error);
      this.isSubmitLoading = false;
    };
    const next = (response: any) => {
      if (this.pizza.toppings) {
        this.pizzaService.assign(this.findPizzaId(response), this.form.value.toppings)
          .subscribe(_ => this.cancel());
      }
      this.isSubmitLoading = false;
    };

    this.isSubmitLoading = true;
    this.pizza = { ...this.form.value, id: this.pizza.id };
    if (this.pizza.id) this.pizzaService.update(this.pizza).subscribe({ next, error });
    else this.pizzaService.add(this.pizza).subscribe({ next, error });
  }

  cancel(): void {
    this.router.navigate(['pizzas']);
  }

  private findPizzaId(response: any): number {
    if (this.pizza.id) return this.pizza.id;
    const match = response.message.match(/.+pizza\/(?<pizzaId>\d+)/);
    return match.groups['pizzaId'] || 0;
  }

  private loadData(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0],
      type: [''],
      size: [''],
      toppings: [[]]
    });
  }
}
