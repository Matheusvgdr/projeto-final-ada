import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './carrinho.state';


export const selectCarrinho = createFeatureSelector<CartState>('carrinho');

export const selectItensCarrinho = createSelector(
  selectCarrinho,
  (state) => state.itens
);

export const selectQtdItensCarrinho = createSelector(
  selectCarrinho,
  (state) => state.itens.length
);

export const selectTotalCarrinho = createSelector(
  selectCarrinho,
  (state) => state.total
);
