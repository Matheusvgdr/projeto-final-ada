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
  ],
  providers: [provideNgxMask(), MessageService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  pagamento = Banknote
  private readonly _formBuilder = inject(FormBuilder);
  liberacaoBotao: boolean = false;

  formCadastro = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    papel: ['ADMIN', Validators.required],
  });

  constructor(private readonly messageService: MessageService) {}

    exibirToast() {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Sucesso ao realizar pagamento' });
    }
}

