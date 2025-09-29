import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { StorageEnum } from '../../core/enums/storage.enum';
import { ENVIRONMENT } from '../../environment/environment';
import { LoginDto } from '../../core/models/login.dto';
import { RolesEnum } from '../../core/enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private expTimer: any;
  private readonly REALIZAR_LOGIN = `${ENVIRONMENT.URL_BASE}/login`;

  constructor(private readonly http: HttpClient) {}

  capturarToken() {
    const { token } = JSON.parse(localStorage.getItem(StorageEnum.USUARIO_LOGADO) || '{}');
    if (!token) return null;

    return token;
  }

  capturarPayloadToken(): any {
    const { token } = JSON.parse(localStorage.getItem(StorageEnum.USUARIO_LOGADO) || '{}');
    if (!token) return null;

    return jwtDecode(token);
  }

  verificarTokenExpirado(): boolean {
    const payload = this.capturarPayloadToken();
    if (!payload?.exp) return false;

    const now = Math.floor(Date.now() / 1000)
    return payload.exp <= now;
  }

  agendarLogout() {
    clearTimeout(this.expTimer);

    const payload = this.capturarPayloadToken();
    if (!payload?.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const tempoAteExpiracao = Math.max((payload.exp - now), 0);

    this.expTimer = setTimeout(() => this.realizarLogout(), tempoAteExpiracao * 1000);
  }

  verificarUsuarioAdmin(): boolean{
    return this.capturarPayloadToken()?.papel == RolesEnum.ADMIN;
  }

  verificarExpiracaoLogin() {
    if (this.verificarTokenExpirado()) {
      this.realizarLogout();
      return;
    }

    this.agendarLogout();
  }

  verificarAutenticacao(): boolean {
    const usuarioLogado = JSON.parse(localStorage.getItem(StorageEnum.USUARIO_LOGADO) || "null");
    return usuarioLogado != null;
  }

  realizarLogin(email: string, senha: string): Observable<boolean> {
    return this.http.post<LoginDto>(`${this.REALIZAR_LOGIN}`, { email, senha })
      .pipe(
        tap(({ token }: LoginDto) => {
          localStorage.setItem(StorageEnum.USUARIO_LOGADO, JSON.stringify({ token }));
        }),
        map(res => res?.token? true : false)
      );
  }

  realizarLogout() {
    localStorage.removeItem(StorageEnum.USUARIO_LOGADO);
  }
}

