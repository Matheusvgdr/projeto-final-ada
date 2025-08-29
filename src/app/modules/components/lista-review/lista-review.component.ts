import { Component, inject, Input, signal } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-lista-review',
  imports: [ReviewComponent],
  templateUrl: './lista-review.component.html',
  styleUrl: './lista-review.component.scss',
})
export class ListaReviewComponent  {
  @Input() set produtoId(value: number | null) {
    if (value) {
      this.reviewService.buscarReviewsPorProdutoId(value)
        .subscribe(data => this.reviews.set(data));
    }
  }

  private readonly reviewService = inject(ReviewService);

  reviews = signal<any[]>([]);
}