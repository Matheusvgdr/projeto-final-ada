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
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RotasEnum } from '../../../core/enums/rotas.enum';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  pagamento = Banknote;
  private readonly _formBuilder = inject(FormBuilder);
  liberacaoBotao: boolean = false;

  formLogin = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  realizarLogin() {
    const valorForm = this.formLogin.value;
    this.authService
      .realizarLogin(valorForm.email as string, valorForm.senha as string)
      .subscribe({
        next: (resultado) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Login realizado com sucesso',
          });
          this.router.navigate([RotasEnum.HOME]);
        },
        error: (erro) => {
           this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao realizar acesso.',
          });
        },
      });
  }
}
