import { carregarCarrinhoDoLocalStorage } from '../../core/utils/local-storage.utils';

export interface CartState {
  itens: any[];
  total: number;
}

export const carrinhoInicialState: CartState =
  carregarCarrinhoDoLocalStorage() || {
    itens: [],
    total: 0,
  };
