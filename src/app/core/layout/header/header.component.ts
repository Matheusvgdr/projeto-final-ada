import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LucideAngularModule,
  MenuIcon,
  HandbagIcon,
  LogOut,
  LogIn,
  CircleUserRound,
  UserRound,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../enums/rotas.enum';
import { AuthService } from '../../../modules/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule,
    ButtonModule,
    DrawerModule,
    AsyncPipe,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menu = MenuIcon;
  carrinho = HandbagIcon;
  visibilidade: boolean = false;
  iconeSair = LogOut;
  login = UserRound

  itensMenu = [{label: 'Home', rota: RotasEnum.HOME}, {label: 'Categorias', rota: '/'}, {label: 'Produtos', rota: '/'}];
  itensCarrinho$: Observable<number>;

  rotaLogin = RotasEnum.LOGIN;
  rotaCarrinho = RotasEnum.CARRINHO;

  private readonly router = inject(Router);
  constructor(private readonly store: Store<{ carrinho: { itens: any[] } }>, private readonly authService: AuthService) {
    this.itensCarrinho$ = this.store.select(
      (state) => state.carrinho.itens.length || 0
    );
  }

  navegar(rota: RotasEnum) {
    this.router.navigate([rota]);
  }

  get verificarUsuarioLogado(): boolean {
    return this.authService.verificarAutenticacao();
  }
  
  sair() {
    this.authService.realizarLogout();
  }
}
