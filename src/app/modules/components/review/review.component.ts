import {
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { ReviewDto } from '../../../core/models/review.dto';
import { NomeAbreviadoPipe } from '../../../core/pipes/nome-abreviado.pipe';

@Component({
  selector: 'app-review',
  imports: [LucideAngularModule, NomeAbreviadoPipe],
  providers:[NomeAbreviadoPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  estrela = Star;

  @Input()
  review: ReviewDto = new ReviewDto();

  arrayEstrelas = new Array(this.review?.estrelas);

  ngOnChanges(simple: SimpleChanges) {
    if (simple['review'].currentValue) {
      this.arrayEstrelas = new Array(simple['review'].currentValue?.estrelas);
    }
  }
}
