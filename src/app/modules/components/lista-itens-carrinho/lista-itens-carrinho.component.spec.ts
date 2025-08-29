import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaItensCarrinhoComponent } from './lista-itens-carrinho.component';

describe('ListaItensCarrinhoComponent', () => {
  let component: ListaItensCarrinhoComponent;
  let fixture: ComponentFixture<ListaItensCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaItensCarrinhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaItensCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
