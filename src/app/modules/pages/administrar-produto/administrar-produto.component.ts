import { Component, inject } from '@angular/core';
import { ListaItensCarrinhoComponent } from '../../components/lista-itens-carrinho/lista-itens-carrinho.component';
import { ListaProdutoComponent } from '../../components/lista-produto/lista-produto.component';
import { AuthService } from '../../services/auth.service';
import { CirclePlus, LucideAngularModule } from 'lucide-angular';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoRequest } from '../../../core/models/request/produto.request';
@Component({
  selector: 'app-administrar-produto',
  imports: [
    ListaProdutoComponent,
    LucideAngularModule,
    Dialog,
    CommonModule,
    Toast,
    NgxMaskDirective,
    TextareaModule,
    FormsModule,
    FloatLabel,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './administrar-produto.component.html',
  styleUrl: './administrar-produto.component.scss',
})
export class AdministrarProdutoComponent {
  iconeAdicionar = CirclePlus;
  visibilidade = false;
  private readonly _formBuilder = inject(FormBuilder);

  constructor(
    private readonly authService: AuthService,
    private readonly produtoService: ProdutoService
  ) {}

  formCadastro = this._formBuilder.group({
    titulo: [null, Validators.required],
    descricao: [null, Validators.required],
    quantidadeEstoque: [null, Validators.required],
    valor: [null, Validators.required],
    imagem: [null, Validators.required],
    desconto: [null],
  });

  ngOnInit() {
    this.verificarPermissao();
  }
  verificarPermissao() {
    console.log('aaaa', this.authService.capturarPayloadToken());
  }

  abrirModalCadastroProduto() {
    this.visibilidade = true;
  }

  criarProduto() {
    const valorForm = this.formCadastro.value;

    const produtoDto: ProdutoRequest = {
      titulo: valorForm.titulo ?? '',
      descricao: valorForm.descricao ?? '',
      desconto: valorForm.desconto ?? 0,
      quantidadeEstoque: valorForm.quantidadeEstoque ?? 0,
      valor: valorForm.valor ?? 0,
      imagem: valorForm.imagem ?? '',
      estrelas: 0,
    };

    this.produtoService.criarProduto(produtoDto);
    this.fecharModal();
  }

  fecharModal() {
    this.visibilidade = false;
  }
}
