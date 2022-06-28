import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectedInputComponent } from './selected-input.component';

describe('SelectedInputComponent', () => {
  let component: SelectedInputComponent;
  let fixture: ComponentFixture<SelectedInputComponent>;

  const touchedMock = jasmine.createSpy('onTouched');
  const changedMock = jasmine.createSpy('onChange');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedInputComponent);
    component = fixture.componentInstance;
    component.registerOnTouched(touchedMock);
    component.registerOnChange(changedMock);
    component.value = '';
    component.items = [
      { value: 'tp1', isSelected: false },
      { value: 'tp2', isSelected: false }
    ];
    fixture.detectChanges();
  });

  it('should have "2" selectable items with headers [tp1, tp2]', () => {
    const selectables = fixture.debugElement.queryAll(By.css('div button'));

    expect(component).toBeTruthy();
    expect(selectables.length).toBe(2);
  });

  it('should have "tp1" value when the first selectable is pressed', () => {
    const selectables = fixture.debugElement.queryAll(By.css('div button'));
    selectables[0].triggerEventHandler('click', null);

    expect(component).toBeTruthy();
    expect(component.value).toBe('tp1');
  });

  it('#select should call "onTouched" and "onChanged" events', () => {
    component.select({ value: 'tp2', isSelected: true });
    
    expect(component).toBeTruthy();
    expect(touchedMock).toHaveBeenCalled();
    expect(changedMock).toHaveBeenCalled();
  });

  it('#writeValue should update the selectable items', () => {
    component.writeValue('tp2');

    expect(component).toBeTruthy();
    expect(component.items[0].isSelected).toBeFalse()
    expect(component.items[1].isSelected).toBeTruthy()
  });
});
