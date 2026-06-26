import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  // URL base del backend para autenticación
  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  // Envía las credenciales al backend y recibe el token + rol
  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { username, password });
  }

  // Guarda el token JWT en localStorage
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Guarda el rol del usuario en localStorage
  guardarRol(rol: string) {
    localStorage.setItem('rol', rol);
  }

  // Obtiene el token JWT guardado
  obtenerToken() {
    return localStorage.getItem('token');
  }

  // Obtiene el rol del usuario guardado
  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  // Elimina token y rol, luego redirige al login
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  // Verifica si el usuario tiene sesión activa
  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  // Verifica si el usuario es Administrador
  esAdmin(): boolean {
    return this.obtenerRol() === 'ROLE_ADMIN';
  }

  // Verifica si el usuario es Supervisora
  esSupervisora(): boolean {
    return this.obtenerRol() === 'ROLE_SUPERVISORA';
  }

  // Verifica si el usuario es Vendedora
  esVendedora(): boolean {
    return this.obtenerRol() === 'ROLE_VENDEDORA';
  }

  // Obtiene los datos del usuario logueado desde el backend
  me() {
    return this.http.get<any>(`${this.api}/me`);
  }
}