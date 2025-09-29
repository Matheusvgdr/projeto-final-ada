import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.verificarTokenExpirado()) {
    authService.realizarLogout();
  }

  const token = authService.capturarToken();
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.realizarLogout();
      }
      return throwError(() => err);
    })
  );
};
