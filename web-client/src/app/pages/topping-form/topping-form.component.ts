import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { DataUtil } from 'src/app/shared/utils/data-util';
import { Topping } from 'src/app/shared/models/topping';
import { ToppingService } from 'src/app/services/topping.service';
import { Selectable } from 'src/app/shared/models/selectable';
import { Location } from '@angular/common';

type Control = 'name' | 'price' | 'type';

@Component({
  selector: 'gp-topping-form',
  templateUrl: './topping-form.component.html',
  styleUrls: ['./topping-form.component.css']
})
export class ToppingFormComponent implements OnInit {
  toppingHeaders: Selectable[] = DataUtil.buildHeaders('toppings');
  isSubmitLoading: boolean = false;
  isDeleteLoading: boolean = false;

  topping!: Topping;
  form!: FormGroup;

  constructor(private toppingService: ToppingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();

    const toppingId = this.route.snapshot.paramMap.get('toppingId');
    if (!toppingId) {
      this.topping = { ...this.form.value, id: 0 };
      return;
    }

    this.toppingService.getById(toppingId!)
      .subscribe({
        next: topping => {
          this.form.patchValue(topping);
          this.topping = topping;
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
    const response = confirm(`Are you sure you want to delete "${this.topping.name}"`);
    if (!response) return;

    this.isDeleteLoading = true;
    this.toppingService.delete(this.topping.id)
      .subscribe({
        next: _ => {
          this.isDeleteLoading = false;
          this.cancel();
        },
        error: (response: any) => {
          alert(response.error.message ?? environment.api.error);
          this.isDeleteLoading = false;
        }
      });
  }

  submit(): void {
    const next = (_: any) => {
      this.isSubmitLoading = false;
      this.router.navigate(['toppings']);
    };
    const error = (response: any) => {
      alert(response.error.message ?? environment.api.error);
      this.isSubmitLoading = false;
    };

    this.isSubmitLoading = true;
    this.topping = { ...this.form.value, id: this.topping.id };
    if (this.topping.id) this.toppingService.update(this.topping).subscribe({ next, error });
    else this.toppingService.add(this.topping).subscribe({ next, error })
  }

  cancel(): void {
    this.location.back();
  }

  private loadData(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0],
      type: ['']
    });
  }
}
