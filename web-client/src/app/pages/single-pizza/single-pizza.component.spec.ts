import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';

import { PizzaService } from 'src/app/services/pizza.service';
import { SinglePizzaComponent } from './single-pizza.component';
import { ToppingService } from 'src/app/services/topping.service';

describe('SinglePizzaComponent', () => {
  let component: SinglePizzaComponent;
  let fixture: ComponentFixture<SinglePizzaComponent>;

  const pizzaServiceMock = jasmine.createSpyObj('PizzaService', ['getById', 'update', 'add', 'assing']);
  const toppingServiceMock = jasmine.createSpyObj('ToppingService', ['getAll']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePizzaComponent],
      providers: [
        FormBuilder,
        { provide: PizzaService, useValue: pizzaServiceMock },
        { provide: ToppingService, useValue: toppingServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SinglePizzaComponent);
    component = fixture.componentInstance;
  });

  it('should evaluate path param to create a new pizza', () => {
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('create');
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
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('create');
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    component.loadTopping();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalledWith(1);
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
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('create');
    toppingServiceMock.getAll.and.returnValue(EMPTY);
    fixture.detectChanges();

    component.cancel();

    expect(component).toBeTruthy();
    expect(toppingServiceMock.getAll).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['pizzas']);
  });
});
