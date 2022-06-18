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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
