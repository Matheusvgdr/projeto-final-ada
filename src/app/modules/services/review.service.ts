import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../core/enums/controllers.enum';
import { ENVIRONMENT } from '../../environment/environment';
import { ReviewDto } from '../../core/models/review.dto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);

  private readonly REQUISICAO = `${ENVIRONMENT.URL_BASE}/${ControllersEnum.REVIEWS}`;
  private readonly listaFixa: ReviewDto[] = [
    {
      id: 1,
      produtoId: 1,
      avaliacao:
        'O cesto de roupa tem um tamanho excelente e o material é bem resistente. Consigo organizar todas as roupas da família sem problemas, e mesmo quando está cheio ele continua firme. Além disso, o design é bonito e combina bem com o quarto de lavanderia.',
      nome: 'Carlos Souza Almeida Santos Ribeiro',
      estrelas: 5,
      imagem: '/img/bg-review-1.jpg',
    },
    {
      id: 2,
      produtoId: 2,
      avaliacao:
        'A luminária superou minhas expectativas. A intensidade da luz é ajustável, o que ajuda bastante quando quero estudar à noite sem cansar os olhos. O acabamento também é de ótima qualidade e dá um toque moderno à escrivaninha.',
      nome: 'Fernanda Lima Cardoso Duarte',
      estrelas: 4,
      imagem: '/img/bg-review-2.jpg',
    },
    {
      id: 3,
      produtoId: 3,
      avaliacao:
        'Essa lâmpada LED é excelente! A iluminação é bem forte e clara, mas ao mesmo tempo aconchegante. Notei uma boa economia de energia na conta de luz depois que substituí todas as lâmpadas da casa.',
      nome: 'João Mendes Silva Lima',
      estrelas: 4,
      imagem: '/img/bg-review-3.jpg',
    },
    {
      id: 4,
      produtoId: 3,
      avaliacao:
        'A lâmpada funciona bem, mas eu esperava que a luz fosse um pouco mais intensa para ambientes maiores. Ainda assim, pelo preço, considero um ótimo custo-benefício.',
      nome: 'Mariana Silva Duarte Lemos',
      estrelas: 3,
      imagem: '/img/bg-review-4.jpg',
    },
  ];

  buscarReviewsPorProdutoId(produtoId: number): Observable<ReviewDto[]> {
    let params = new HttpParams();
    params = params.set('produtoId', produtoId.toString());
    return this.http.get<ReviewDto[]>(this.REQUISICAO, { params }).pipe(
      catchError((error) => {
        return of(this.listaFixa.filter((item) => item.produtoId == produtoId));
      })
    );
  }
}
