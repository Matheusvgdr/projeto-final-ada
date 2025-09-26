import { Component, inject, Input } from '@angular/core';
import { ProdutoResponse } from '../../../core/models/response/produto.response';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';
import { CurrencyPipe } from '@angular/common';
import { BookOpen, LucideAngularModule, Pencil, Trash2, X } from 'lucide-angular';
import { ProdutoService } from '../../services/produto.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-produto',
  imports: [RouterModule, CurrencyPipe, LucideAngularModule, Dialog],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  visualizacao = BookOpen;
  iconeRemover = X;
  iconeDeletar = Trash2;
  visibilidade = false;


  @Input()
  produto: ProdutoResponse = new ProdutoResponse();

  private readonly router = inject(Router);
    private readonly produtoService = inject(ProdutoService);

  navegar(produtoId: number) {
    this.router.navigate([RotasEnum.DETALHE_PRODUTO, produtoId]);
  }

  abrirModalConfirmacao() {
    this.visibilidade = true;
  }

  confirmarDelecao() {
    this.produtoService.deletarProduto(this.produto.id).subscribe({
      next: (resultado) => {

      },
      error: (erro) => {

      }
    });
  }

  fecharModal() {
    this.visibilidade = false;
  }
}
