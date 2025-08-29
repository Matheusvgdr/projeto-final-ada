import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProdutoService } from './produto.service';
import { ProdutoDto } from '../../core/models/produto.dto';
import { ENVIRONMENT } from '../../environment/environment';
import { ControllersEnum } from '../../core/enums/controllers.enum';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let mockHttp: HttpTestingController;

  const URL = `${ENVIRONMENT.URL_BASE}/${ControllersEnum.PRODUTOS}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProdutoService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProdutoService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('deve buscar todos os produtos com sucesso', () => {
    const mockProdutos: ProdutoDto[] = [
      {
        id: 1,
        titulo: 'Produto Teste',
        descricao: 'Descricao',
        estrelas: 5,
        valor: 100,
        imagem: '',
        desconto: 0,
      },
    ];

    service.buscarProdutos().subscribe((produtos) => {
      expect(produtos).toEqual(mockProdutos);
    });

    const req = mockHttp.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockProdutos);
  });

  it('deve retornar lista fixa caso a API falhe em buscar produtos', () => {
    service.buscarProdutos().subscribe((produtos) => {
      expect(produtos.length).toBe(3);
      expect(produtos[0].titulo).toBe('Cesto de Roupa');
    });

    const req = mockHttp.expectOne(URL);
    req.error(new ProgressEvent('erro'));
  });

  it('deve buscar produto por id com sucesso', () => {
    const mockProduto: ProdutoDto = {
      id: 99,
      titulo: 'Mock Produto',
      descricao: 'Descricao',
      estrelas: 3,
      valor: 50,
      imagem: '',
      desconto: 0,
    };

    service.buscarProdutosPorId(99).subscribe((produto) => {
      expect(produto).toEqual(mockProduto);
    });

    const req = mockHttp.expectOne(
      (request) => request.url === URL && request.params.get('id') === '99'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduto);
  });

  it('deve retornar produto da lista fixa se a API falhar em buscar por id', () => {
    service.buscarProdutosPorId(2).subscribe((produto) => {
      expect(produto).toBeTruthy();
      expect(produto.id).toBe(2);
      expect(produto.titulo).toBe('Luminária de Mesa');
    });

    const req = mockHttp.expectOne(
      (request) => request.url === URL && request.params.get('id') === '2'
    );
    req.error(new ProgressEvent('erro'));
  });
});
