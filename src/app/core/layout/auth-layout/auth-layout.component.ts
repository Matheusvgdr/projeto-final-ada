import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../../modules/components/loader/loader.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
