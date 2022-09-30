import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EMPTY, of } from 'rxjs';

import { ToppingFormComponent } from './topping-form.component';
import { ToppingService } from 'src/app/services/topping.service';
import { Location } from '@angular/common';

describe('ToppingFormComponent', () => {
  let component: ToppingFormComponent;
  let fixture: ComponentFixture<ToppingFormComponent>;

  const serviceMock = jasmine.createSpyObj('ToppingService', ['getById', 'update', 'add', 'delete']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const locationMock = jasmine.createSpyObj('Location', ['back']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToppingFormComponent],
      providers: [
        FormBuilder,
        { provide: ToppingService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToppingFormComponent);
    component = fixture.componentInstance;
  });

  it('should evaluate path param to create a new topping', () => {
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue(null);
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
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue(null);
    fixture.detectChanges();

    component.cancel();

    expect(component).toBeTruthy();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('#delete should call to ToppingService to delete an already existing topping', () => {
    const topping = { name: '', price: 0, type: '', id: 14 };
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue('14');
    serviceMock.getById.withArgs('14').and.returnValue(of(topping));
    fixture.detectChanges();

    spyOn(window, 'confirm').and.callFake(() => true);
    serviceMock.delete.withArgs(14).and.returnValue(EMPTY);

    component.delete();
    expect(serviceMock.getById).toHaveBeenCalledWith('14');
    expect(serviceMock.delete).toHaveBeenCalledWith(14);
  });
});

