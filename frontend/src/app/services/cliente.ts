import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private api = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  guardar(cliente: any): Observable<any> {
    return this.http.post<any>(this.api, cliente);
  }

  actualizar(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, cliente);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}