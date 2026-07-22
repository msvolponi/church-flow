import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '@/app/shared/enums/role';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  const userRole = authService.getRole();
  if (userRole !== Role.ADMIN) {
    return router.createUrlTree(['/access'], {
      queryParams: { returnUrl: state.url }
    });
  }

  return true;
};
