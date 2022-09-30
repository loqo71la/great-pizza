import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ToppingListComponent } from './topping-list.component';
import { ToppingService } from 'src/app/services/topping.service';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ToppingListComponent', () => {
  let component: ToppingListComponent;
  let fixture: ComponentFixture<ToppingListComponent>;

  const serviceMock = jasmine.createSpyObj('ToppingService', ['getAll']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const sort = environment.sorters.toppings[0].id;
  const limit = environment.api.limit;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToppingListComponent],
      providers: [
        { provide: ToppingService, useValue: serviceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    serviceMock.getAll.withArgs(1, limit, sort).and.returnValue(EMPTY);
    fixture = TestBed.createComponent(ToppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call to ToppingService when it is created with page "1" by default', () => {
    expect(component).toBeTruthy();
    expect(serviceMock.getAll).toHaveBeenCalledWith(1, limit, sort);
  });

  it('#loadToppings should call to ToppingService specific page "4"', () => {
    serviceMock.getAll.withArgs(4, limit, sort).and.returnValue(EMPTY);

    component.loadToppings({ page: 4, sort });
    expect(serviceMock.getAll).toHaveBeenCalledWith(4, limit, sort);
  });

  it('#onActions should navigate to ["toppings", "create"] with "add" action', () => {
    component.onActions({ action: 'add' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['toppings', 'create']);
  });

  it('#onActions should navigate to ["toppings", "34"] with "open" action', () => {
    component.onActions({ action: 'open', item: { id: '34' } });
    expect(routerMock.navigate).toHaveBeenCalledWith(['toppings', '34']);
  });
});
