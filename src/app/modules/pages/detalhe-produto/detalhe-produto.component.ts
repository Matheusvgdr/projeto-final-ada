import { Component, computed, inject } from '@angular/core';
import {
  CirclePlus,
  LucideAngularModule,
  Minus,
  Pencil,
  Star,
  Trash2,
} from 'lucide-angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { ProdutoService } from '../../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListaReviewComponent } from '../../components/lista-review/lista-review.component';
import { Store } from '@ngrx/store';
import * as CarrinhoActions from '../../store/carrinho.actions';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FloatLabel } from 'primeng/floatlabel';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { ProdutoResponse } from '../../../core/models/response/produto.response';
import { ProdutoRequest } from '../../../core/models/request/produto.request';

@Component({
  selector: 'app-detalhe-produto',
  imports: [
    LucideAngularModule,
    ListaReviewComponent,
    CurrencyPipe,
    Dialog,
    ButtonModule,
    InputTextModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    ReactiveFormsModule,
    CommonModule,
    Toast,
    NgxMaskDirective,
    TextareaModule,
  ],
  providers: [MessageService],
  templateUrl: './detalhe-produto.component.html',
  styleUrl: './detalhe-produto.component.scss',
})
export class DetalheProdutoComponent {
  estrela = Star;
  adicionar = CirclePlus;
  remover = Trash2;
  iconeEditar = Pencil;

  visible: boolean = false;

  produtoParaEditar: ProdutoResponse;

  private readonly route = inject(ActivatedRoute);
  private readonly produtoService = inject(ProdutoService);
  private readonly store = inject(Store);

  constructor(private readonly messageService: MessageService) {}

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

  private readonly _formBuilder = inject(FormBuilder);

  liberacaoBotao: boolean = false;

  formEdicao = this._formBuilder.group({
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    quantidadeEstoque: [0, Validators.required],
    valor: [0, Validators.required],
    imagem: ['', Validators.required],
    desconto: [0],
  });

  showDialog(produto: ProdutoResponse) {
    this.formEdicao.get('titulo')?.setValue(produto.titulo);
    this.formEdicao.get('descricao')?.setValue(produto.descricao);
    this.formEdicao
      .get('quantidadeEstoque')
      ?.setValue(produto.quantidadeEstoque);
    this.formEdicao.get('valor')?.setValue(produto.valor);
    this.formEdicao.get('imagem')?.setValue(produto.imagem);
    this.formEdicao.get('desconto')?.setValue(produto.desconto);
    this.visible = true;
  }

  editarProduto() {
    const valorForm = this.formEdicao.value;

    const produtoDto: ProdutoRequest = {
      titulo: valorForm.titulo as string,
      descricao: valorForm.descricao as string,
      desconto: valorForm.desconto ?? 0,
      quantidadeEstoque: valorForm.quantidadeEstoque as number,
      valor: valorForm.valor as number,
      imagem: valorForm.imagem as string,
      estrelas: 0,
    };

    this.produtoService.editarProduto(produtoDto, this.produto().id).subscribe({
      next: (resultado) => {
        this.fecharModal();
      },
      error: (error) => {

      }
    });
  }

  fecharModal(){
    this.visible = false;
  }

  exibirToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Sucesso ao realizar pagamento',
    });
  }
}
