import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReviewComponent } from './lista-review.component';

describe('ListaReviewComponent', () => {
  let component: ListaReviewComponent;
  let fixture: ComponentFixture<ListaReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
