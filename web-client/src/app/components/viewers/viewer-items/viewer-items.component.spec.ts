import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ViewerItemsComponent } from './viewer-items.component';

describe('ViewerItemsComponent', () => {
  let component: ViewerItemsComponent;
  let fixture: ComponentFixture<ViewerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewerItemsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerItemsComponent);
    component = fixture.componentInstance;
    component.pageable = { currentPage: 1, totalPages: 1, totalItems: 0, items: [] };
    component.name = 'Test';
    fixture.detectChanges();
  });

  it('should generate the message "1 - 0 of 0" with empty pagination', () => {
    const span = fixture.debugElement.query(By.css('div span'));
    expect(span.nativeElement.innerHTML).toContain('1 - 0 of 0')
  });

  it('should send an event when the "Add" button is pressed', () => {
    component.actions.subscribe(event => {
      expect(event.action).toBe('add');
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('div button'));
    button.triggerEventHandler('click', null);
  });
});
