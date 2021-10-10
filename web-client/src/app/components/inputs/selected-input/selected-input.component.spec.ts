import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedInputComponent } from './selected-input.component';

describe('SelectedInputComponent', () => {
  let component: SelectedInputComponent;
  let fixture: ComponentFixture<SelectedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
