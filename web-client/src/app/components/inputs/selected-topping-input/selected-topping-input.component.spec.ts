import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedToppingInputComponent } from './selected-topping-input.component';

describe('SelectedGroupItemComponent', () => {
  let component: SelectedToppingInputComponent;
  let fixture: ComponentFixture<SelectedToppingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedToppingInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedToppingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
