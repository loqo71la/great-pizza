import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SinglePizzaComponent } from './pages/single-pizza/single-pizza.component';
import { SingleToppingComponent } from './pages/single-topping/single-topping.component';
import { ToppingComponent } from './pages/topping/topping.component';

import { InputComponent } from './components/inputs/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectedInputComponent } from './components/inputs/selected-input/selected-input.component';
import { ViewerItemsComponent } from './components/viewers/viewer-items/viewer-items.component';
import { ViewerPageComponent } from './components/viewers/viewer-page/viewer-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
      { path: 'pizzas', component: PizzaComponent },
      { path: 'pizzas/:pizzaId', component: SinglePizzaComponent },
      { path: 'toppings', component: ToppingComponent },
      { path: 'toppings/:toppingId', component: SingleToppingComponent }
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
    PizzaComponent,
    SelectedInputComponent,
    SinglePizzaComponent,
    SingleToppingComponent,
    ToppingComponent,
    ViewerItemsComponent,
    ViewerPageComponent,
    LoaderComponent,
    FooterComponent
  ]
})
export class AppRoutingModule { }
