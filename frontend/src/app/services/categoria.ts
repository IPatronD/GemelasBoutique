import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  // URL base del backend para categorías
  private api = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todas las categorías
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Crea una nueva categoría
  guardar(categoria: any): Observable<any> {
    return this.http.post<any>(this.api, categoria);
  }

  // Actualiza una categoría existente por ID
  actualizar(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, categoria);
  }

  // Elimina una categoría por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}