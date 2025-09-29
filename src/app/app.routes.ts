import { Routes } from '@angular/router';
import { RotasEnum } from './core/enums/rotas.enum';
import { HomeComponent } from './modules/pages/home/home.component';
import { DetalheProdutoComponent } from './modules/pages/detalhe-produto/detalhe-produto.component';
import { ItemCarrinhoComponent } from './modules/components/item-carrinho/item-carrinho.component';
import { CarrinhoComponent } from './modules/components/carrinho/carrinho.component';
import { PagamentoComponent } from './modules/components/pagamento/pagamento.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { CadastroComponent } from './modules/pages/cadastro/cadastro.component';
import { AdministrarProdutoComponent } from './modules/pages/administrar-produto/administrar-produto.component';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: RotasEnum.HOME, component: HomeComponent },
      {
        path: RotasEnum.ADMINISTRAR_PRODUTOS,
        component: AdministrarProdutoComponent,
        canActivate: [authGuard],
        data: { precisaSerAdmin: true }
      },
      {
        path: `${RotasEnum.DETALHE_PRODUTO}/:id`,
        component: DetalheProdutoComponent,
      },
      { path: RotasEnum.CARRINHO, component: CarrinhoComponent },
      {
        path: RotasEnum.PAGAMENTO,
        component: PagamentoComponent,
        canActivate: [authGuard],
        data: { precisaSerAdmin: false }
      },
    ],
  },
  {
    path: RotasEnum.NAO_LOGADO,
    component: AuthLayoutComponent,
    children: [
      { path: RotasEnum.LOGIN, component: LoginComponent },
      { path: RotasEnum.CADASTRO, component: CadastroComponent },
    ],
  },
];

