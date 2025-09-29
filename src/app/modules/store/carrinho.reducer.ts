import { createReducer, on } from '@ngrx/store';
import { carrinhoInicialState } from './carrinho.state';
import {
  adicionarProdutoCarrinho,
  limparCarrinho,
  removerProdutoCarrinho,
} from './carrinho.actions';
import { salvarCarrinhoNoLocalStorage } from '../../core/utils/local-storage.utils';
import { StorageEnum } from '../../core/enums/storage.enum';

export const carrinhoReducer = createReducer(
  carrinhoInicialState,
  on(adicionarProdutoCarrinho, (state, { produto }) => {
    const newItems = [...state.itens, produto];
    const newState = {
      ...state,
      itens: newItems,
      total: newItems.reduce((sum, item) => sum + item.valor, 0),
    };
    salvarCarrinhoNoLocalStorage(newState);
    return newState;
  }),
  on(removerProdutoCarrinho, (state, { produtoId }) => {
    const index = state.itens.findIndex((item) => item.id === produtoId);

    if (index === -1) return state;

    const newItems = [...state.itens];
    newItems.splice(index, 1);

    const newState = {
      ...state,
      itens: newItems,
      total: newItems.reduce((sum, item) => sum + item.valor, 0),
    };
    salvarCarrinhoNoLocalStorage(newState);
    return newState;
  }),

  on(limparCarrinho, (state) => {
    const novoEstado = {
      itens: [],
      total: 0,
    };
    localStorage.removeItem(StorageEnum.CARRINHO);
    return novoEstado;
  })
);
