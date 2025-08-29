import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProdutoDto } from '../../core/models/produto.dto';
import { ENVIRONMENT } from '../../environment/environment';
import { ControllersEnum } from '../../core/enums/controllers.enum';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly http = inject(HttpClient);

  private readonly REQUISICAO = `${ENVIRONMENT.URL_BASE}/${ControllersEnum.PRODUTOS}`;
  private readonly listaFixa: ProdutoDto[] = [
      {
        id: 1,
        titulo: 'Cesto de Roupa',
        descricao:
          'Cesto de roupa dobrável e resistente, ideal para organizar roupas sujas ou armazenar peças limpas de forma prática.',
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
        estrelas: 4,
        valor: 83,
        imagem: '/img/produto-lampada.svg',
        desconto: 15,
      },
    ];
  buscarProdutos(): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(this.REQUISICAO).pipe(
      catchError((error) => {
        return of(this.listaFixa);
      })
    );
  }

  buscarProdutosPorId(produtoId: number): Observable<ProdutoDto> {

    let params = new HttpParams();
    params = params.set('id', produtoId.toString());
    return this.http.get<ProdutoDto>(this.REQUISICAO, { params }).pipe(
      catchError((error) => {
        return of(this.listaFixa.find(item => item.id == produtoId) as ProdutoDto);
      })
    );
  }
}
