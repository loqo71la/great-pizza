import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerItemsComponent } from './viewer-items.component';

describe('ViewerItemsComponent', () => {
  let component: ViewerItemsComponent;
  let fixture: ComponentFixture<ViewerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
