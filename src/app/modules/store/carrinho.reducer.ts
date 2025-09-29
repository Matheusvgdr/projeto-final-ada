import { createReducer, on } from '@ngrx/store';
import { carrinhoInicialState } from './carrinho.state';
import {
  adicionarProdutoCarrinho,
  removerProdutoCarrinho,
} from './carrinho.actions';

export const carrinhoReducer = createReducer(
  carrinhoInicialState,
  on(adicionarProdutoCarrinho, (state, { produto }) => {
    const newItems = [...state.itens, produto];

    return {
      ...state,
      itens: newItems,
      total: newItems.reduce((sum, item) => sum + item.valor, 0),
    };
  }),
  on(removerProdutoCarrinho, (state, { produtoId }) => {
    const index = state.itens.findIndex((item) => item.id === produtoId);

    if (index === -1) return state; 

    const newItems = [...state.itens];
    newItems.splice(index, 1); 

    return {
      ...state,
      itens: newItems,
      total: newItems.reduce((sum, item) => sum + item.valor, 0),
    };
  })
);
