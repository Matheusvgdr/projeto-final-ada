import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LucideAngularModule,
  MenuIcon,
  HandbagIcon,
  LogOut,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../enums/rotas.enum';

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
  voltar = LogOut;
  itensMenu = [{label: 'Home', rota: RotasEnum.HOME}, {label: 'Categorias', rota: '/'}, {label: 'Produtos', rota: '/'}];
  itensCarrinho$: Observable<number>;

  private readonly router = inject(Router);
  constructor(private readonly store: Store<{ carrinho: { itens: any[] } }>) {
    this.itensCarrinho$ = this.store.select(
      (state) => state.carrinho.itens.length || 0
    );
  }

  navegar() {
    this.router.navigate([RotasEnum.CARRINHO]);
  }
}
