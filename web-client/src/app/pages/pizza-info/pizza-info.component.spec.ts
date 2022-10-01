import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PizzaService } from 'src/app/services/pizza.service';

import { PizzaInfoComponent } from './pizza-info.component';

describe('PizzaInfoComponent', () => {
  let component: PizzaInfoComponent;
  let fixture: ComponentFixture<PizzaInfoComponent>;

  const pizzaServiceMock = jasmine.createSpyObj('PizzaService', ['getById', 'qualify', 'delete']);
  const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const locationMock = jasmine.createSpyObj('Location', ['back']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaInfoComponent],
      providers: [
        { provide: PizzaService, useValue: pizzaServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PizzaInfoComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    routeMock.snapshot.paramMap.get.withArgs('pizzaId').and.returnValue('1');
    pizzaServiceMock.getById.withArgs('1').and.returnValue(throwError(() => new Error('Pizza not Found')));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
