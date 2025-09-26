import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarProdutoComponent } from './administrar-produto.component';

describe('AdministrarProdutoComponent', () => {
  let component: AdministrarProdutoComponent;
  let fixture: ComponentFixture<AdministrarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
