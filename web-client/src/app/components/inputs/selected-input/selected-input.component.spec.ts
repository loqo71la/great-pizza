import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectedInputComponent } from './selected-input.component';

describe('SelectedInputComponent', () => {
  let component: SelectedInputComponent;
  let fixture: ComponentFixture<SelectedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedInputComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedInputComponent);
    component = fixture.componentInstance;
    component.registerOnTouched(() => { });
    component.registerOnChange(() => { });
    component.headers = ['tp1', 'tp2'];
    fixture.detectChanges();
  });

  it('should create with "undefined" value by default', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBeUndefined()
  });

  it('should have "2" selectable items with headers [tp1, tp2]', () => {
    const selectables = fixture.debugElement.queryAll(By.css('div[class^=tp]'));
    expect(selectables.length).toBe(2);
  });

  it('should have "tp1" value when the first selectable is pressed', () => {
    const selectable = fixture.debugElement.query(By.css('div.tp1')).parent;
    selectable?.triggerEventHandler('click', null);
    expect(component.value).toBe('tp1');
  });
});
