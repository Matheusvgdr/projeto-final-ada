import { createReducer, on } from '@ngrx/store';
import { carrinhoInicialState } from './carrinho.state';
import { adicionarProdutoCarrinho } from './carrinho.actions';

export const carrinhoReducer = createReducer(
  carrinhoInicialState,
  on(adicionarProdutoCarrinho, (state, { produto }) => {
    const newItems = [...state.itens, produto];

    return {
      ...state,
      itens: newItems,
      total: newItems.reduce((sum, item) => sum + item.valor, 0),
    };
  })
);
