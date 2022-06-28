import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  const controlMock = jasmine.createSpyObj('FormControl', ['hasValidator']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = controlMock;
    component.label = 'Test Input';
    fixture.detectChanges();
  });

  it('should be created generating a default id based on the label "testinput"', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBe('testinput');
  });

  it('#required should validate if it is required', () => {
    controlMock.hasValidator.withArgs(Validators.required).and.returnValue(false);

    expect(component).toBeTruthy();
    expect(component.required).toBeFalse();
    expect(controlMock.hasValidator).toHaveBeenCalledWith(Validators.required);
  })

  it('#style should evaluate if it is a valid input', () => {
    expect(component).toBeTruthy();
    expect(component.style).toBe('form-control');
  })
});
