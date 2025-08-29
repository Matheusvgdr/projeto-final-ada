import { Component, computed, inject } from '@angular/core';
import { CirclePlus, LucideAngularModule, Star } from 'lucide-angular';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { ProdutoService } from '../../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListaReviewComponent } from '../../components/lista-review/lista-review.component';
import { Store } from '@ngrx/store';
import * as CarrinhoActions from '../../store/carrinho.actions';

@Component({
  selector: 'app-detalhe-produto',
  imports: [LucideAngularModule, ListaReviewComponent, CurrencyPipe],
  templateUrl: './detalhe-produto.component.html',
  styleUrl: './detalhe-produto.component.scss',
})
export class DetalheProdutoComponent {
  estrela = Star;
  adicionar = CirclePlus;
  private readonly route = inject(ActivatedRoute);
  private readonly produtoService = inject(ProdutoService);
  private readonly store = inject(Store);

  public produto = toSignal(
    this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) =>
        this.produtoService
          .buscarProdutosPorId(id)
          .pipe(map((lista) => (Array.isArray(lista) ? lista[0] : lista)))
      )
    )
  );
  arrayEstrelas = computed(() => {
    const produto = this.produto();
    return produto?.estrelas ? Array(produto.estrelas).fill(0) : [];
  });

  adicionarProdutoCarrinho() {
    this.store.dispatch(
      CarrinhoActions.adicionarProdutoCarrinho({ produto: this.produto() })
    );
  }
}
