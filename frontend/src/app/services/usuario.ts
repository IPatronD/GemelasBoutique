import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  // URL base del backend para usuarios
  private api = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los usuarios
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtiene un usuario por su ID
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Crea un nuevo usuario
  guardar(usuario: any): Observable<any> {
    return this.http.post<any>(this.api, usuario);
  }

  // Actualiza un usuario existente por ID
  actualizar(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, usuario);
  }

  // Elimina un usuario por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Busca un usuario por su nombre de usuario
  buscarPorUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.api}/username/${username}`);
  }
}