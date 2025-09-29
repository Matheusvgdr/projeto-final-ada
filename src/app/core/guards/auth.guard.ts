import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../modules/services/auth.service';
import { RotasEnum } from '../enums/rotas.enum';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.verificarAutenticacao()) {
    router.navigate([RotasEnum.HOME]);
    return false;
  }

  const precisaSerAdmin = route.data['precisaSerAdmin'] === true;

  if (precisaSerAdmin && !authService.verificarUsuarioAdmin()) {
    router.navigate([RotasEnum.HOME]);
    return false;
  }

  return true;
};
