import { Routes } from '@angular/router';
import { RotasEnum } from './core/enums/rotas.enum';
import { HomeComponent } from './modules/pages/home/home.component';
import { DetalheProdutoComponent } from './modules/pages/detalhe-produto/detalhe-produto.component';
import { ItemCarrinhoComponent } from './modules/components/item-carrinho/item-carrinho.component';
import { CarrinhoComponent } from './modules/components/carrinho/carrinho.component';
import { PagamentoComponent } from './modules/components/pagamento/pagamento.component';

export const routes: Routes = [
  {
    path: RotasEnum.HOME,
    component: HomeComponent,
  },
  {
    path: `${RotasEnum.DETALHE_PRODUTO}/:id`,
    component: DetalheProdutoComponent,
  },
  {
    path: RotasEnum.CARRINHO,
    component: CarrinhoComponent,
  },
  {
    path: RotasEnum.PAGAMENTO,
    component: PagamentoComponent,
  },
];
