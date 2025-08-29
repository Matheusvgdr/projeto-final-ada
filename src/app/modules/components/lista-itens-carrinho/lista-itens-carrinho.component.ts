import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectItensCarrinho,
  selectQtdItensCarrinho,
  selectTotalCarrinho,
} from '../../store/carrinho.selectors';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ItemCarrinhoComponent } from '../item-carrinho/item-carrinho.component';
import { Router } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';
import { CircleX, LucideAngularModule, ShoppingBag, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-lista-itens-carrinho',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ItemCarrinhoComponent,
    LucideAngularModule,
  ],
  templateUrl: './lista-itens-carrinho.component.html',
  styleUrl: './lista-itens-carrinho.component.scss',
})
export class ListaItensCarrinhoComponent {
  compras = ShoppingBag;
  msg = CircleX
  private readonly store = inject(Store<{ carrinho: { itens: any[] } }>);

  itensCarrinho$ = this.store.select(selectItensCarrinho);
  qtdItens$ = this.store.select(selectQtdItensCarrinho);
  total$ = this.store.select(selectTotalCarrinho);

  private readonly router = inject(Router);

  navegar() {
    this.router.navigate([RotasEnum.PAGAMENTO]);
  }
}
