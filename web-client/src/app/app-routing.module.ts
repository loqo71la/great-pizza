import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PizzaFormComponent } from './pages/pizza-form/pizza-form.component';
import { PizzaInfoComponent } from './pages/pizza-info/pizza-info.component';
import { PizzaListComponent } from './pages/pizza-list/pizza-list.component';
import { ToppingFormComponent } from './pages/topping-form/topping-form.component';
import { ToppingInfoComponent } from './pages/topping-info/topping-info.component';
import { ToppingListComponent } from './pages/topping-list/topping-list.component';

import { InputComponent } from './components/inputs/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectedInputComponent } from './components/inputs/selected-input/selected-input.component';
import { ViewerItemsComponent } from './components/viewers/viewer-items/viewer-items.component';
import { ViewerPageComponent } from './components/viewers/viewer-page/viewer-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
      { path: 'pizzas', component: PizzaListComponent },
      { path: 'pizzas/create', component: PizzaFormComponent, canActivate: [AuthGuard] },
      { path: 'pizzas/:pizzaId', component: PizzaInfoComponent },
      { path: 'pizzas/:pizzaId/update', component: PizzaFormComponent, canActivate: [AuthGuard] },
      { path: 'toppings', component: ToppingListComponent },
      { path: 'toppings/create', component: ToppingFormComponent, canActivate: [AuthGuard] },
      { path: 'toppings/:toppingId', component: ToppingInfoComponent },
      { path: 'toppings/:toppingId/update', component: ToppingFormComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [
    HeaderComponent,
    HomeComponent,
    InputComponent,
    PaginationComponent,
    PizzaFormComponent,
    PizzaInfoComponent,
    PizzaListComponent,
    SelectedInputComponent,
    ToppingFormComponent,
    ToppingInfoComponent,
    ToppingListComponent,
    ViewerItemsComponent,
    ViewerPageComponent,
    LoaderComponent,
    FooterComponent,
    PizzaInfoComponent,
    ToppingInfoComponent
  ]
})
export class AppRoutingModule { }
