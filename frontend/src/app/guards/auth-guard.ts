import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.estaLogueado()) {
    router.navigate(['/']);
    return false;
  }

  const rolesPermitidos = route.data?.['roles'] as string[];

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rolUsuario = auth.obtenerRol();
    if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};