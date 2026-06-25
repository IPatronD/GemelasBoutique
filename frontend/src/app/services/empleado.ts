import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private api = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  listarSinUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/sin-usuario`);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  guardar(empleado: any): Observable<any> {
    return this.http.post<any>(this.api, empleado);
  }

  actualizar(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, empleado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}