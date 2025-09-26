import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule, Banknote } from 'lucide-angular';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FormsModule, FloatLabel, ReactiveFormsModule,CommonModule, LucideAngularModule,Toast, NgxMaskDirective],
  providers:[provideNgxMask(), MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  pagamento = Banknote;
  private readonly _formBuilder = inject(FormBuilder);
  liberacaoBotao: boolean = false;

  formLogin = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  constructor(private readonly messageService: MessageService) {}

  exibirToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Sucesso ao realizar pagamento',
    });
  }
}
