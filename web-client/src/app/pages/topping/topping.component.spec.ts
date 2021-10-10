import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingComponent } from './topping.component';

describe('ToppingComponent', () => {
  let component: ToppingComponent;
  let fixture: ComponentFixture<ToppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
