import { HttpInterceptor } from '@angular/common/http';
import { Auth } from '../services/auth';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Lee el token guardado en localStorage
  const token = localStorage.getItem('token');

  // Si hay token, agrega el header Authorization a todas las peticiones HTTP
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // formato requerido por Spring Security
      },
    });
    // Envía la petición modificada con el token
    return next(cloned);
  }

  // Si no hay token, envía la petición sin modificar (ej: el login)
  return next(req);
};