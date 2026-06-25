import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private api = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  guardar(usuario: any): Observable<any> {
    return this.http.post<any>(this.api, usuario);
  }

  actualizar(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, usuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  buscarPorUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.api}/username/${username}`);
  }
}