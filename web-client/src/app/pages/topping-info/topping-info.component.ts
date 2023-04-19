import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToppingService } from 'src/app/services/topping.service';
import { Topping } from 'src/app/shared/models/topping';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gp-topping-info',
  templateUrl: './topping-info.component.html',
  styleUrls: ['./topping-info.component.css']
})
export class ToppingInfoComponent implements OnInit {
  isDeleteLoading: boolean = false;
  topping!: Topping;

  constructor(private toppingService: ToppingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const toppingId = this.route.snapshot.paramMap.get('toppingId');
    this.toppingService.getById(toppingId!)
      .subscribe({
        next: topping => {
          this.topping = topping;
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

  delete(): void {
    if (!this.authService.user.value) {
      this.authService.signIn();
      return;
    }

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
}
