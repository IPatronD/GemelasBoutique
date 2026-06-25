import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  guardar(producto: any): Observable<any> {
    return this.http.post<any>(this.api, producto);
  }

  actualizar(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, producto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}