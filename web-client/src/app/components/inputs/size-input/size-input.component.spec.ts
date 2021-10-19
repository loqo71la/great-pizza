import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeInputComponent } from './size-input.component';

describe('SizeInputComponent', () => {
  let component: SizeInputComponent;
  let fixture: ComponentFixture<SizeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
