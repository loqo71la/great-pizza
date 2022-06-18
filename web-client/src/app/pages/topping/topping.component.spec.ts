import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ToppingComponent } from './topping.component';
import { ToppingService } from 'src/app/services/topping.service';
import { EMPTY } from 'rxjs';

describe('ToppingComponent', () => {
  let component: ToppingComponent;
  let fixture: ComponentFixture<ToppingComponent>;

  const serviceMock = jasmine.createSpyObj('ToppingService', ['getAll', 'delete']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToppingComponent],
      providers: [
        { provide: ToppingService, useValue: serviceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    serviceMock.getAll.withArgs(1).and.returnValue(EMPTY);
    fixture = TestBed.createComponent(ToppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call to ToppingService when it is created with page "1" by default', () => {
    expect(component).toBeTruthy();
    expect(serviceMock.getAll).toHaveBeenCalledWith(1);
  });

  it('#loadToppings should call to ToppingService specific page "4"', () => {
    serviceMock.getAll.withArgs(4).and.returnValue(EMPTY);

    component.loadToppings(4);
    expect(serviceMock.getAll).toHaveBeenCalledWith(4);
  });

  it('#onActions should navigate to ["toppings", "create"] with "add" action', () => {
    component.onActions({ action: 'add' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['toppings', 'create']);
  });

  it('#onActions should navigate to ["toppings", "34"] with "edit" action', () => {
    component.onActions({ action: 'edit', item: { id: '34' } });
    expect(routerMock.navigate).toHaveBeenCalledWith(['toppings', '34']);
  });

  it('#onActions should call to ToppingService with "delete" action', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    serviceMock.delete.withArgs('14').and.returnValue(EMPTY);

    component.onActions({ action: 'delete', item: { id: '14' } });
    expect(serviceMock.delete).toHaveBeenCalledWith('14');
  });
});
