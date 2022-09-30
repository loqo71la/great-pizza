import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToppingService } from 'src/app/services/topping.service';

import { ToppingInfoComponent } from './topping-info.component';

describe('ToppingInfoComponent', () => {
  let component: ToppingInfoComponent;
  let fixture: ComponentFixture<ToppingInfoComponent>;

  const toppingServiceMock = jasmine.createSpyObj('ToppingService', ['getById', 'delete']);
  const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
  const routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
  const locationMock = jasmine.createSpyObj('Location', ['back']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToppingInfoComponent ],
      providers: [
        { provide: ToppingService, useValue: toppingServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToppingInfoComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    routeMock.snapshot.paramMap.get.withArgs('toppingId').and.returnValue('1');
    toppingServiceMock.getById.withArgs('1').and.returnValue(throwError(() => new Error('Topping not Found')));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
