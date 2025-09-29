import { Component, computed, inject, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProdutoResponse } from '../../../core/models/response/produto.response';
import { LucideAngularModule, Star } from 'lucide-angular';
import { removerProdutoCarrinho } from '../../store/carrinho.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-item-carrinho',
  imports: [CurrencyPipe, LucideAngularModule],
  templateUrl: './item-carrinho.component.html',
  styleUrl: './item-carrinho.component.scss',
})
export class ItemCarrinhoComponent {
  estrela = Star;
  @Input()
  produto: ProdutoResponse = new ProdutoResponse();

  arrayEstrelas = computed(() => {
    const produto = this.produto;
    return produto?.estrelas ? Array(produto.estrelas).fill(0) : [];
  });

  private readonly store = inject(Store<{ carrinho: { itens: any[] } }>);

  removerItem(id: string) {
    this.store.dispatch(removerProdutoCarrinho({ produtoId: id }));
  }
}
