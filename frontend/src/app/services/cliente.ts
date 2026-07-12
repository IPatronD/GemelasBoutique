import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  // URL base del backend para clientes
  private api = `${environment.apiUrl}/api/clientes`;

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los clientes
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtiene un cliente por su ID
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Crea un nuevo cliente
  guardar(cliente: any): Observable<any> {
    return this.http.post<any>(this.api, cliente);
  }

  // Actualiza un cliente existente por ID
  actualizar(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, cliente);
  }

  // Elimina un cliente por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}