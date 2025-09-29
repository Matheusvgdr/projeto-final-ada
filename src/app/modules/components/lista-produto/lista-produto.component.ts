import { Component, inject } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProdutoComponent } from '../produto/produto.component';

@Component({
  selector: 'app-lista-produto',
  imports: [ProdutoComponent],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss',
})
export class ListaProdutoComponent {
  private readonly produtoService = inject(ProdutoService);

  produtos = this.produtoService.produtos;

  constructor() {
    this.produtoService.buscarProdutos();
  }
}
