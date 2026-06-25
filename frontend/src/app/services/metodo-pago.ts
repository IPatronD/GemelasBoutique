import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private api = 'http://localhost:8080/api/metodos-pago';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  guardar(metodo: any): Observable<any> {
    return this.http.post<any>(this.api, metodo);
  }

  actualizar(id: number, metodo: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, metodo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}