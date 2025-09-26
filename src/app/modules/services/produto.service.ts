import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProdutoResponse } from '../../core/models/response/produto.response';
import { ENVIRONMENT } from '../../environment/environment';
import { ControllersEnum } from '../../core/enums/controllers.enum';
import { ProdutoRequest } from '../../core/models/request/produto.request';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly http = inject(HttpClient);

  private readonly REQUISICAO = `${ENVIRONMENT.URL_BASE}/${ControllersEnum.PRODUTOS}`;
  private readonly listaFixa: ProdutoResponse[] = [
    {
      id: 1,
      titulo: 'Cesto de Roupa',
      descricao:
        'Cesto de roupa dobrável e resistente, ideal para organizar roupas sujas ou armazenar peças limpas de forma prática.',
      dataCriacao: new Date().toISOString(),
      quantidadeEstoque: 10,
      estrelas: 4,
      valor: 150,
      imagem: '/img/produto-cesto.svg',
      desconto: 10,
    },
    {
      id: 2,
      titulo: 'Luminária',
      descricao:
        'Luminária de mesa com design moderno e regulagem de intensidade, perfeita para leitura e estudos.',
      dataCriacao: new Date().toISOString(),
      quantidadeEstoque: 20,
      estrelas: 5,
      valor: 220,
      imagem: '/img/produto-luminaria.svg',
      desconto: 5,
    },
    {
      id: 3,
      titulo: 'Lâmpada LED',
      descricao:
        'Lâmpada LED econômica e de longa duração, com luz branca natural que ilumina bem ambientes internos.',
      dataCriacao: new Date().toISOString(),
      quantidadeEstoque: 30,
      estrelas: 4,
      valor: 83,
      imagem: '/img/produto-lampada.svg',
      desconto: 15,
    },
  ];

  buscarProdutos(): Observable<ProdutoResponse[]> {
    return this.http.get<ProdutoResponse[]>(this.REQUISICAO).pipe(
      catchError((error) => {
        return of(this.listaFixa);
      })
    );
  }

  buscarProdutosPorId(produtoId: number): Observable<ProdutoResponse> {
    let params = new HttpParams();
    params = params.set('id', produtoId.toString());
    return this.http.get<ProdutoResponse>(this.REQUISICAO, { params }).pipe(
      catchError((error) => {
        return of(
          this.listaFixa.find((item) => item.id == produtoId) as ProdutoResponse
        );
      })
    );
  }

  criarProduto(request: ProdutoRequest): Observable<ProdutoResponse>{
    return this.http.post<ProdutoResponse>(this.REQUISICAO, request);
  }

  editarProduto(request: ProdutoRequest, id: number): Observable<ProdutoResponse> {
    return this.http.put<ProdutoResponse>(`${this.REQUISICAO}/${id}`, request);
  }

  deletarProduto(ìdProduto: number): Observable<any> {
    return this.http.delete<any>(`${this.REQUISICAO}/${ìdProduto}`);
  }
}
