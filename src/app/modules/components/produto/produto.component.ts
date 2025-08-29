import { Component, inject, Input } from '@angular/core';
import { ProdutoDto } from '../../../core/models/produto.dto';
import { Router, RouterModule } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';
import { CurrencyPipe } from '@angular/common';
import { BookOpen, Eye, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-produto',
  imports: [RouterModule, CurrencyPipe, LucideAngularModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  visualizacao = BookOpen
  @Input()
  produto: ProdutoDto = new ProdutoDto();

  private readonly router = inject(Router)

  navegar(produtoId: number){
    this.router.navigate([RotasEnum.DETALHE_PRODUTO, produtoId])
  }
}
