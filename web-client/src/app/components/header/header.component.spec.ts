import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceMock = jasmine.createSpyObj('AuthService', ['signOut'], {user: new BehaviorSubject(undefined)});
  const eventSubject = new ReplaySubject<RouterEvent>();
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: 'test/url'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created with 2 menus ["Pizzas", "Toppings"] by default', () => {
    expect(component).toBeTruthy();

    const menus = fixture.debugElement.queryAll(By.css('a.nav-link'));
    expect(menus.length).toBe(2);
    expect(menus[0].nativeElement.textContent).toBe('Pizzas')
    expect(menus[1].nativeElement.textContent).toBe('Toppings');
  });
});
