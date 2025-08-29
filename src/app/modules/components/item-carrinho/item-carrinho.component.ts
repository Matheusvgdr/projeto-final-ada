import { Component, computed,  Input } from '@angular/core';
import {  CurrencyPipe } from '@angular/common';
import { ProdutoDto } from '../../../core/models/produto.dto';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-item-carrinho',
  imports: [ CurrencyPipe, LucideAngularModule],
  templateUrl: './item-carrinho.component.html',
  styleUrl: './item-carrinho.component.scss',
})
export class ItemCarrinhoComponent {
  estrela = Star;
  @Input()
  produto: ProdutoDto = new ProdutoDto();

  arrayEstrelas = computed(() => {
    const produto = this.produto;
    return produto?.estrelas ? Array(produto.estrelas).fill(0) : [];
  });
}
