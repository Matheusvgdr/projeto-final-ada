import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-loader',
  imports: [ProgressSpinner, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(public loadingService: LoaderService) {}
}
