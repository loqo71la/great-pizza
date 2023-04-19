import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/shared/models/pizza';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gp-pizza-info',
  templateUrl: './pizza-info.component.html',
  styleUrls: ['./pizza-info.component.css']
})
export class PizzaInfoComponent implements OnInit {
  ratings = environment.ratings.map(rating => ({ ...rating }));
  isRatingLoading: boolean = false;
  isDeleteLoading: boolean = false;
  isDisableRating: boolean = false;
  totalToppingPrice = 0;
  totalPercentage = 0;
  totalRating = 0;
  pizza!: Pizza;

  constructor(private pizzaService: PizzaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  get reverseRatings() {
    return this.ratings.map(item => item).reverse();
  }

  ngOnInit(): void {
    const pizzaId = this.route.snapshot.paramMap.get('pizzaId');
    this.pizzaService.getById(pizzaId!)
      .subscribe({
        next: pizza => {
          this.pizza = pizza;
          this.totalToppingPrice = this.pizza.toppings?.reduce((acc, topping) => acc + topping.price, 0) || 0;
          this.totalRating = this.pizza.ratings?.reduce((acc, rating) => acc + rating.amount, 0) || 0;
          this.totalPercentage = this.pizza.rating * 20;
          this.pizza.ratings?.forEach(rating => {
            const index = rating.level - 1;
            const percentage = rating.amount * (100 / this.totalRating);
            this.ratings[index].value = percentage;
            this.ratings[index].style = `width: ${percentage}%;`
          })
        },
        error: response => {
          alert(response.error.message ?? environment.api.error);
          this.cancel();
        }
      });
  }

  cancel(): void {
    this.location.back();
  }

  rate(index: number): void {
    if (!this.authService.user.value) {
      this.authService.signIn();
      return;
    }

    this.isDisableRating = true;
    this.ratings[index].selected = true;
    this.pizzaService.qualify(this.pizza.id, index + 1)
      .subscribe({
        next: (response: any) => {
          alert(response.message);
          this.router.navigate(['/']);
        },
        error: (response: any) => {
          alert(response.error.message ?? environment.api.error);
          this.isDisableRating = false;
          this.ratings[index].selected = false;
        }
      });
  }

  delete(): void {
    if (!this.authService.user.value) {
      this.authService.signIn();
      return;
    }

    const response = confirm(`Are you sure you want to delete "${this.pizza.name}"`);
    if (!response) return;

    this.isDeleteLoading = true;
    this.pizzaService.delete(this.pizza.id)
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
}
