import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LucideAngularModule,
  MenuIcon,
  HandbagIcon,
  LogOut,
  UserRound,
  Globe,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../enums/rotas.enum';
import { AuthService } from '../../../modules/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageEnum } from '../../enums/storage.enum';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule,
    ButtonModule,
    DrawerModule,
    AsyncPipe,
    RouterModule,
    TranslateModule,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menu = MenuIcon;
  carrinho = HandbagIcon;
  visibilidade: boolean = false;
  iconeSair = LogOut;
  login = UserRound;
  iconeIdioma = Globe

  itensMenu: any[] = [];

  itensCarrinho$: Observable<number>;

  rotaLogin = [RotasEnum.NAO_LOGADO, RotasEnum.LOGIN];
  rotaCarrinho = RotasEnum.CARRINHO;
  idiomaAtual = 'pt-br';

  idiomas = [
    { label: 'Português', value: 'pt-br' },
    { label: 'English', value: 'en' },
  ];

  private readonly router = inject(Router);
  constructor(
    private readonly store: Store<{ carrinho: { itens: any[] } }>,
    private readonly authService: AuthService,
    private readonly translateService: TranslateService
  ) {
    this.itensCarrinho$ = this.store.select(
      (state) => state.carrinho.itens.length || 0
    );
    this.idiomaAtual = this.translateService.getCurrentLang() ?? 'pt-br';

    this.itensMenu = [
    { label: 'Home', rota: RotasEnum.HOME, visibilidadeItemMenu: true },
    { label: 'Administração', rota: RotasEnum.ADMINISTRAR_PRODUTOS, visibilidadeItemMenu: authService.verificarUsuarioAdmin() || false },
    
    
  ];
  console.log(this.itensMenu)
  }

  navegar(rota: RotasEnum | RotasEnum[]) {
    this.router.navigate([rota]);
  }

  get verificarUsuarioLogado(): boolean {
    return this.authService.verificarAutenticacao();
  }

  sair() {
    this.authService.realizarLogout();
    this.router.navigate([RotasEnum.NAO_LOGADO, RotasEnum.LOGIN]);
  }

  mudarIdioma(idioma: any) {
    this.idiomaAtual = idioma;
    this.translateService.use(idioma); 
  }
}
