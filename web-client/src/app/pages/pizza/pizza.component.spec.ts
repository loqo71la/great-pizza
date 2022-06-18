import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PizzaComponent } from './pizza.component';
import { PizzaService } from 'src/app/services/pizza.service';
import { EMPTY } from 'rxjs';

describe('PizzaComponent', () => {
  let component: PizzaComponent;
  let fixture: ComponentFixture<PizzaComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const serviceMock = jasmine.createSpyObj('PizzaService', ['getAll', 'delete']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaComponent ],
      providers: [
        { provide: PizzaService, useValue: serviceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    serviceMock.getAll.withArgs(1).and.returnValue(EMPTY);
    fixture = TestBed.createComponent(PizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should call to PizzaService when it is created with page "1" by default', () => {
    expect(component).toBeTruthy();
    expect(serviceMock.getAll).toHaveBeenCalledWith(1);
  });

  it('#loadPizzas should call to PizzaService specific page "3"', () => {
    serviceMock.getAll.withArgs(3).and.returnValue(EMPTY);

    component.loadPizzas(3);
    expect(serviceMock.getAll).toHaveBeenCalledWith(3);
  });

  it('#onActions should navigate to ["pizzas", "create"] with "add" action', () => {
    component.onActions({ action: 'add' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['pizzas', 'create']);
  });

  it('#onActions should navigate to ["pizzas", "12"] with "edit" action', () => {
    component.onActions({ action: 'edit', item: { id: '12' } });
    expect(routerMock.navigate).toHaveBeenCalledWith(['pizzas', '12']);
  });

  it('#onActions should call to PizzaService with "delete" action', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    serviceMock.delete.withArgs('56').and.returnValue(EMPTY);

    component.onActions({ action: 'delete', item: { id: '56' } });
    expect(serviceMock.delete).toHaveBeenCalledWith('56');
  });
});
