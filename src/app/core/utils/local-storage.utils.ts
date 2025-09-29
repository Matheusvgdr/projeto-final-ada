import { StorageEnum } from "../enums/storage.enum";

export function salvarCarrinhoNoLocalStorage(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(StorageEnum.CARRINHO, serializedState);
  } catch (e) {
    console.error('Erro ao salvar carrinho no localStorage', e);
  }
}

export function carregarCarrinhoDoLocalStorage(): any {
  try {
    const serializedState = localStorage.getItem(StorageEnum.CARRINHO);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Erro ao carregar carrinho do localStorage', e);
    return undefined;
  }
}
