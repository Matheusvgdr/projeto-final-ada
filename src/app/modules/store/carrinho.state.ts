export interface CartState {
  itens: any[];
  total: number;
}

export const carrinhoInicialState: CartState = {
  itens: [],
  total: 0,
};