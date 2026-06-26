import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  // URL base del backend para productos
  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los productos
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtiene un producto por su ID
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Crea un nuevo producto
  guardar(producto: any): Observable<any> {
    return this.http.post<any>(this.api, producto);
  }

  // Actualiza un producto existente por ID
  actualizar(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, producto);
  }

  // Elimina un producto por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}