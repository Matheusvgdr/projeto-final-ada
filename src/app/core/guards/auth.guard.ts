import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/services/auth.service';
import { RotasEnum } from '../enums/rotas.enum';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.verificarAutenticacao()) {
    router.navigate([RotasEnum.LOGIN]);
    return false;
  }

  return true;
};
