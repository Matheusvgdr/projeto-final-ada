import { Component } from '@angular/core';
import { ListaItensCarrinhoComponent } from '../lista-itens-carrinho/lista-itens-carrinho.component';

@Component({
  selector: 'app-carrinho',
  imports: [ListaItensCarrinhoComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {

}
