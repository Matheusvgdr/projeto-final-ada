import { createAction, props } from '@ngrx/store';

export const adicionarProdutoCarrinho = createAction(
    '[Detalhe produto] adicionar produto ao carrinho',
    props<{ produto: any }>()
);