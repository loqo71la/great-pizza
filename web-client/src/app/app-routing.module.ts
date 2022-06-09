import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { ToppingComponent } from './pages/topping/topping.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ViewerItemsComponent } from './components/viewers/viewer-items/viewer-items.component';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';
import { PriceInputComponent } from './components/inputs/price-input/price-input.component';
import { ViewerPageComponent } from './components/viewers/viewer-page/viewer-page.component';
import { SelectedInputComponent } from './components/inputs/selected-input/selected-input.component';
import { SelectedToppingInputComponent } from './components/inputs/selected-topping-input/selected-topping-input.component';
import { ModalComponent } from './components/modal/modal.component';
import { SizeInputComponent } from './components/inputs/size-input/size-input.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
      { path: 'pizzas', component: PizzaComponent },
      { path: 'toppings', component: ToppingComponent },
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    PizzaComponent,
    ToppingComponent,
    HeaderComponent,
    PaginationComponent,
    ViewerItemsComponent,
    NameInputComponent,
    PriceInputComponent,
    SelectedInputComponent,
    ViewerPageComponent,
    SelectedToppingInputComponent,
    ModalComponent,
    SizeInputComponent,
    FormComponent
  ]
})
export class AppRoutingModule { }
