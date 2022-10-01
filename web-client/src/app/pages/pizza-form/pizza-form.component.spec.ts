import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';

import { PizzaService } from 'src/app/services/pizza.service';
import { PizzaFormComponent } from './pizza-form.component';
import { ToppingService } from 'src/app/services/topping.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

describe('PizzaFormComponent', () => {
  let component: PizzaFormComponent;
  let fixture: ComponentFixture<PizzaFormComponent>;

  const pizzaServiceMock = jasmine.createSpyObj('PizzaService', ['getById', 'update', 'add', 'assing', 'delete']);
  const toppingServiceMock = jasmine.createSpyObj('ToppingService', ['getAll']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const locationMock = jasmine.createSpyObj('Location', ['back']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const sort = environment.sorters.toppings[0].id;
  const limit = environment.api.limit;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaFormComponent],
      providers: [
        FormBuilder,
        { provide: PizzaService, useValue: pizzaServiceMock },
        { provide: ToppingService, useValue: toppingServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PizzaFormComponent);
    component = fixture.componentInstance;
  });

  it('should evaluate path param to create a new pizza', () => {
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue(null);
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('pizzaId');
    expect(toppingServiceMock.getAll).toHaveBeenCalled()
  });

  it('should evaluate path param to get an already existing pizza with id "7"', () => {
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('7');
    pizzaServiceMock.getById.withArgs('7').and.returnValue(EMPTY);
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalled();
    expect(pizzaServiceMock.getById).toHaveBeenCalledWith('7');
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('pizzaId');
  });

  it('#loadTopping should call PizzaService to load the pageable "1" by default', () => {
    const topping = { id: 22, name: '', type: '', price: 0 };
    const pageable = { currentPage: 1, totalPages: 1, totalItems: 1, items: [topping] };
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue(null);
    toppingServiceMock.getAll.withArgs(1, limit, sort).and.returnValue(of(pageable));
    fixture.detectChanges();

    component.loadTopping();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalledWith(1, limit, sort);
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('pizzaId');
  });

  it('#submit should call to PizzaService and ToppingService to update an already existing pizza', () => {
    const pizza = { name: '', price: 0, type: '', size: '', id: 5, toppings: [] };
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('5');
    pizzaServiceMock.getById.withArgs('5').and.returnValue(of(pizza));
    pizzaServiceMock.update.withArgs(pizza).and.returnValue(EMPTY);
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    component.submit();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalled();
    expect(pizzaServiceMock.getById).toHaveBeenCalledWith('5');
    expect(pizzaServiceMock.update).toHaveBeenCalledWith(pizza);
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('pizzaId');
  });

  it('#cancel should call Router to navigate to "/pizzas"', () => {
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue(null);
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    component.cancel();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalled();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('#onActions should call to PizzaService  to delete an already existing pizza', () => {
    const pizza = { name: '', price: 0, type: '', size: '', id: 11, toppings: [] };
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('11');
    pizzaServiceMock.getById.withArgs('11').and.returnValue(of(pizza));
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    spyOn(window, 'confirm').and.callFake(() => true);
    pizzaServiceMock.delete.withArgs(11).and.returnValue(EMPTY);

    component.delete();
    expect(pizzaServiceMock.getById).toHaveBeenCalledWith('11');
    expect(pizzaServiceMock.delete).toHaveBeenCalledWith(11);
  });
});
