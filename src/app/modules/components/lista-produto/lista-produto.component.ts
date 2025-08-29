import { Component, inject } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProdutoComponent } from "../produto/produto.component";

@Component({
  selector: 'app-lista-produto',
  imports: [ProdutoComponent],
  providers: [ProdutoService],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss',
})
export class ListaProdutoComponent {
  private readonly produtoService = inject(ProdutoService);
  public produtos = toSignal(this.produtoService.buscarProdutos());
}
