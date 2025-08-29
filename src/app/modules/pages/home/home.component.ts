import { Component } from '@angular/core';
import {
  ArrowRightIcon,
  BadgePlusIcon,
  Banknote,
  Lock,
  LucideAngularModule,
  Phone,
  ShoppingCart,
} from 'lucide-angular';

import ScrollReveal from 'scrollreveal';
import { ListaProdutoComponent } from '../../components/lista-produto/lista-produto.component';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, ListaProdutoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {
  setaDireitra = ArrowRightIcon;
  novo = BadgePlusIcon;
  dinheiro = Banknote;
  carrinho = ShoppingCart;
  cadeado = Lock;
  telefone = Phone;

  ngOnInit() {
    const sr = ScrollReveal({
      origin: 'left',
      distance: '20px',
      duration: 1000,
      reset: false, // Set to true if you want animations to reset on scroll up
    });

    // Apply reveal to elements with a specific class
    sr.reveal('.reveal-esquerda');
  }
}
