import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PizzaListComponent } from './pizza-list.component';
import { PizzaService } from 'src/app/services/pizza.service';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('PizzaListComponent', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const serviceMock = jasmine.createSpyObj('PizzaService', ['getAll']);
  const sort = environment.sorters.pizzas[0].id;
  const limit = environment.api.limit;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaListComponent],
      providers: [
        { provide: PizzaService, useValue: serviceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    serviceMock.getAll.withArgs(1, limit, sort).and.returnValue(EMPTY);
    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should call to PizzaService when it is created with page "1" by default', () => {
    expect(component).toBeTruthy();
    expect(serviceMock.getAll).toHaveBeenCalledWith(1, limit, sort);
  });

  it('#loadPizzas should call to PizzaService specific page "3"', () => {
    serviceMock.getAll.withArgs(3, limit, sort).and.returnValue(EMPTY);

    component.loadPizzas({ page: 3, sort });
    expect(serviceMock.getAll).toHaveBeenCalledWith(3, limit, sort);
  });

  it('#onActions should navigate to ["pizzas", "create"] with "add" action', () => {
    component.onActions({ action: 'add' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['pizzas', 'create']);
  });

  it('#onActions should navigate to ["pizzas", "12"] with "open" action', () => {
    component.onActions({ action: 'open', item: { id: '12' } });
    expect(routerMock.navigate).toHaveBeenCalledWith(['pizzas', '12']);
  });
});
