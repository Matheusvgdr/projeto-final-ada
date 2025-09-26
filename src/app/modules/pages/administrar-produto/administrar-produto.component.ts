import { Component } from '@angular/core';
import { ListaItensCarrinhoComponent } from "../../components/lista-itens-carrinho/lista-itens-carrinho.component";
import { ListaProdutoComponent } from "../../components/lista-produto/lista-produto.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-administrar-produto',
  imports: [ListaItensCarrinhoComponent, ListaProdutoComponent],
  templateUrl: './administrar-produto.component.html',
  styleUrl: './administrar-produto.component.scss'
})
export class AdministrarProdutoComponent {

  constructor(private readonly authService: AuthService){}

  ngOnInit(){
    this.verificarPermissao()
  }
  verificarPermissao(){
    console.log('aaaa',this.authService.capturarPayloadToken());    
  }
}
