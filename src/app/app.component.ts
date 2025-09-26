import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { LoaderComponent } from './modules/components/loader/loader.component';
import { AuthService } from './modules/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
   constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verificarExpiracaoLogin();
  }
}
