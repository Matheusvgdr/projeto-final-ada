import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { ENVIRONMENT } from '../../environment/environment';
import { ControllersEnum } from '../../core/enums/controllers.enum';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ReviewService', () => {
  let service: ReviewService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ReviewService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar reviews pelo id do produto', () => {
    const mockResponse = [
      {
        id: 99,
        produtoId: 1,
        avaliacao: 'Teste',
        nome: 'Matheus',
        estrelas: 5,
        imagem: 'img.jpg'
      },
    ];

    service.buscarReviewsPorProdutoId(1).subscribe((reviews) => {
      expect(reviews.length).toBe(1);
      expect(reviews[0].id).toBe(99);
    });

    const req = mockHttp.expectOne(
      `${ENVIRONMENT.URL_BASE}/${ControllersEnum.REVIEWS}?produtoId=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // responde a requisição fake
  });

  it('deve retornar lista fixa em caso de erro', () => {
    service.buscarReviewsPorProdutoId(3).subscribe((reviews) => {
      expect(reviews.length).toBeGreaterThan(0);
      expect(reviews[0].produtoId).toBe(3);
    });

    const req = mockHttp.expectOne(
      `${ENVIRONMENT.URL_BASE}/${ControllersEnum.REVIEWS}?produtoId=3`
    );
    req.error(new ProgressEvent('error'));
  });
});
