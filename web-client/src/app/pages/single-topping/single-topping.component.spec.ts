import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EMPTY, of } from 'rxjs';

import { SingleToppingComponent } from './single-topping.component';
import { ToppingService } from 'src/app/services/topping.service';

describe('SingleToppingComponent', () => {
  let component: SingleToppingComponent;
  let fixture: ComponentFixture<SingleToppingComponent>;

  const serviceMock = jasmine.createSpyObj('ToppingService', ['getById', 'update', 'add']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleToppingComponent],
      providers: [
        FormBuilder,
        { provide: ToppingService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleToppingComponent);
    component = fixture.componentInstance;
  });

  it('should evaluate path param to create a new topping', () => {
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue('create');
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('toppingId');
  });

  it('should evaluate path param to get an already existing topping with id "12"', () => {
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue('12');
    serviceMock.getById.withArgs('12').and.returnValue(EMPTY);
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(serviceMock.getById).toHaveBeenCalledWith('12');
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('toppingId');
  });

  it('#submit should call to ToppingService to update an already existing topping', () => {
    const topping = { name: '', price: 0, type: '', id: 5 };
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue('5');
    serviceMock.update.withArgs(topping).and.returnValue(EMPTY);
    serviceMock.getById.withArgs('5').and.returnValue(of(topping));
    fixture.detectChanges();

    component.submit();

    expect(component).toBeTruthy();
    expect(serviceMock.getById).toHaveBeenCalledWith('5');
    expect(serviceMock.update).toHaveBeenCalledWith(topping);
    expect(routeMock.snapshot.paramMap.get).toHaveBeenCalledWith('toppingId');
  });

  it('#cancel should call Router to navigate to "/toppings"', () => {
    fixture.detectChanges();
    
    component.cancel();

    expect(component).toBeTruthy();
    expect(routerMock.navigate).toHaveBeenCalledWith(['toppings']);
  });
});

