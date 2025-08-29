import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { Banknote, LucideAngularModule } from 'lucide-angular';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagamento',
  imports: [InputTextModule, FormsModule, FloatLabel, ReactiveFormsModule,CommonModule, LucideAngularModule,Toast, NgxMaskDirective],
  providers:[provideNgxMask(), MessageService],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss',
})
export class PagamentoComponent {
  pagamento = Banknote
  private readonly _formBuilder = inject(FormBuilder);
  liberacaoBotao: boolean = false;

  formDadosPagamento = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', Validators.required],
    endereco: ['', Validators.required],
  });

  constructor(private readonly messageService: MessageService) {}

    exibirToast() {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Sucesso ao realizar pagamento' });
    }
}
