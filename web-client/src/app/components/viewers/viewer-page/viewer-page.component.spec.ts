import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageComponent } from './viewer-page.component';

describe('ViewerPageComponent', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewerPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerPageComponent);
    component = fixture.componentInstance;
    component.pageable = { currentPage: 1, totalPages: 1, totalItems: 0, items: [] };
    fixture.detectChanges();
  });

  it('#toStringSubItem should return "" by default without toppings property', () => {
    const item = { toppings: [] };
    expect(component).toBeTruthy();
    expect(component.toStringSubItem(item)).toBe(' ');
  });

  it('#toStringSubItem should concatenate the topping names "Tomato, Cucumber"', () => {
    const item = { toppings: [{ id: 1, name: 'Tomato' }, { id: 2, name: 'Cucumber' }] };
    expect(component).toBeTruthy();
    expect(component.toStringSubItem(item)).toBe('Tomato, Cucumber');
  });

  it('#loadTotal should calculate the total price of the item and subitem "13.7"', () => {
    const item = { price: 7.2, toppings: [{ id: 1, price: 6 }, { id: 2, price: 0.5 }] };
    expect(component).toBeTruthy();
    expect(component.loadTotal(item)).toBe(13.7);
  });

  it('#hasSubItem should be "true" when an item has subitems', () => {
    const item = { toppings: [{ id: 1, price: 6 }] };
    expect(component).toBeTruthy();
    expect(component.hasSubItem(item)).toBeTruthy();
  });

  it('#hasSubItem should be "false" when an item has no subitems', () => {
    const item = { toppings: [] };
    expect(component).toBeTruthy();
    expect(component.hasSubItem(item)).toBeFalsy();
  });

  it('#getLastModified should return "modifiedDate" if was defined, otherwise return "createdDate"', () => {
    const date = new Date();
    const modifiedItem = { modifiedDate: date };
    const createdItem = { createdDate: date };

    expect(component).toBeTruthy();
    expect(component.getLastModified(modifiedItem)).toBe(date);
    expect(component.getLastModified(createdItem)).toBe(date);
  });

  it('#open should send an event with the current item and the action "open"', () => {
    const item = {id: 1, name: 'test'};
    component.actions.subscribe(event => {
      expect(event.action).toBe('open');
      expect(event.item).toBe(item);
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
    component.open(item);
  });
});
