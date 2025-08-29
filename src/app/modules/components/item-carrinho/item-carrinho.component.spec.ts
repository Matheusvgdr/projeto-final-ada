import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarrinhoComponent } from './item-carrinho.component';

describe('ItemCarrinhoComponent', () => {
  let component: ItemCarrinhoComponent;
  let fixture: ComponentFixture<ItemCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCarrinhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
