import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  // Inyecta el servicio de auth y el router
  const auth = inject(Auth);
  const router = inject(Router);

  // Si no hay token, redirige al login
  if (!auth.estaLogueado()) {
    router.navigate(['/']);
    return false;
  }

  // Lee los roles permitidos definidos en la ruta (data: { roles: [...] })
  const rolesPermitidos = route.data?.['roles'] as string[];

  // Si la ruta tiene roles definidos, verifica que el usuario tenga el correcto
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rolUsuario = auth.obtenerRol();

    // Si el rol del usuario no está en la lista, bloquea el acceso
    if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
      router.navigate(['/']);
      return false;
    }
  }

  // Todo OK, permite el acceso
  return true;
};