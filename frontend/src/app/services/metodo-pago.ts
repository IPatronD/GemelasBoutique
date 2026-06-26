import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  // URL base del backend para métodos de pago
  private api = 'http://localhost:8080/api/metodos-pago';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los métodos de pago
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Crea un nuevo método de pago
  guardar(metodo: any): Observable<any> {
    return this.http.post<any>(this.api, metodo);
  }

  // Actualiza un método de pago existente por ID
  actualizar(id: number, metodo: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, metodo);
  }

  // Elimina un método de pago por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}