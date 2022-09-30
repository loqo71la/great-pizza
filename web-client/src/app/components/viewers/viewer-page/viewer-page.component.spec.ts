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

  it('#loadTotal should calculate the total price of the item and subitem "13.7"', () => {
    const item = { price: 7.2, toppingPrice: 6.5 };
    expect(component).toBeTruthy();
    expect(component.loadTotal(item)).toBe(13.7);
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
