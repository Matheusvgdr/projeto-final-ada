import { createAction, props } from '@ngrx/store';

export const adicionarProdutoCarrinho = createAction(
    '[Detalhe produto] adicionar produto ao carrinho',
    props<{ produto: any }>()
);

export const removerProdutoCarrinho = createAction(
  '[Carrinho] Remover produto do carrinho',
  props<{ produtoId: string }>()
);
