import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { username, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  guardarRol(rol: string) {
    localStorage.setItem('rol', rol);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  esAdmin(): boolean {
    return this.obtenerRol() === 'ROLE_ADMIN';
  }

  esSupervisora(): boolean {
    return this.obtenerRol() === 'ROLE_SUPERVISORA';
  }

  esVendedora(): boolean {
    return this.obtenerRol() === 'ROLE_VENDEDORA';
  }

  me() {
    return this.http.get<any>(`${this.api}/me`);
  }
}