import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LucideAngularModule, Banknote } from 'lucide-angular';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRequest } from '../../../core/models/request/usuario.request';
import { Router, RouterLink } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';

@Component({
  selector: 'app-cadastro',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
    Toast,
    NgxMaskDirective,
    RouterLink,
  ],
  providers: [provideNgxMask(), MessageService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  pagamento = Banknote;
  private readonly _formBuilder = inject(FormBuilder);
  liberacaoBotao: boolean = false;

  formCadastro = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  constructor(
    private readonly messageService: MessageService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  cadastrarUsuario() {
    const valorForm = this.formCadastro.value;
    let novoUsuario: UsuarioRequest = {
      email: valorForm.email as string,
      nome: valorForm.nome as string,
      senha: valorForm.senha as string,
    };
    this.usuarioService.cadastrarUsuario(novoUsuario).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cadastro realizado com sucesso',
        });
        this.router.navigate([RotasEnum.NAO_LOGADO, RotasEnum.LOGIN]);
      },
      error: (erro) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao realizar cadastro.',
        });
      },
    });
  }
}
