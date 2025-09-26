import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../../core/models/response/usuario.response';
import { UsuarioRequest } from '../../core/models/request/usuario.request';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly CADASTRAR_USUARIO = `${ENVIRONMENT.URL_BASE}/users`;

  constructor(private readonly http: HttpClient) {}

  cadastrarUsuario(request: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.CADASTRAR_USUARIO, request);
  }
}
