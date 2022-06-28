import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.currentPage = 2;
    component.totalPages = 5;
  });
  
  it('#select should send an event with the selected page "3"', () => {
    component.selectedPage.subscribe(page => {
      expect(page).toBe(3)
    })
    fixture.detectChanges();

    component.select(3);
    expect(component).toBeTruthy();
  });

  it('#moveLeft should send an event with the currentPage reduced by "1"', () => {
    component.selectedPage.subscribe(page => {
      expect(page).toBe(1)
    })
    fixture.detectChanges();

    component.moveLeft();
    expect(component).toBeTruthy();
  });

  it('#moveRight should send an event with the currentPage increased by "1"', () => {
    component.selectedPage.subscribe(page => {
      expect(page).toBe(3)
    })
    fixture.detectChanges();

    component.moveRight();
    expect(component).toBeTruthy();
  });
});
