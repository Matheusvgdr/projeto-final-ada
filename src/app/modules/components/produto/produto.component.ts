import { Component, inject, Input } from '@angular/core';
import { ProdutoResponse } from '../../../core/models/response/produto.response';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';
import { CurrencyPipe } from '@angular/common';
import {
  BookOpen,
  LucideAngularModule,
  Pencil,
  Trash2,
  X,
} from 'lucide-angular';
import { ProdutoService } from '../../services/produto.service';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto',
  imports: [RouterModule, CurrencyPipe, LucideAngularModule, Dialog],
  providers:[MessageService],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  visualizacao = BookOpen;
  iconeRemover = X;
  iconeDeletar = Trash2;
  visibilidade = false;

  usuarioAdmin: boolean = false;

  @Input()
  produto: ProdutoResponse = new ProdutoResponse();

  private readonly router = inject(Router);
  private readonly produtoService = inject(ProdutoService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  constructor() {
    this.usuarioAdmin = this.authService.verificarUsuarioAdmin();
  }

  navegar(produtoId: number) {
    this.router.navigate([RotasEnum.DETALHE_PRODUTO, produtoId]);
  }

  abrirModalConfirmacao() {
    this.visibilidade = true;
  }

  confirmarDelecao() {
    this.produtoService.deletarProduto(this.produto.id).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Deleção realizada com sucesso',
        });
        this.fecharModal();
      },
      error: (erro) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao realizar deleção.',
        });
        this.fecharModal();
      },
    });
  }

  fecharModal() {
    this.visibilidade = false;
  }
}
