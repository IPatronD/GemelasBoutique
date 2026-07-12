import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  // URL base del backend para empleados
  private api = `${environment.apiUrl}/api/empleados`;

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los empleados
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtiene empleados que aún no tienen usuario asignado
  listarSinUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/sin-usuario`);
  }

  // Obtiene un empleado por su ID
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Crea un nuevo empleado
  guardar(empleado: any): Observable<any> {
    return this.http.post<any>(this.api, empleado);
  }

  // Actualiza un empleado existente por ID
  actualizar(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, empleado);
  }

  // Elimina un empleado por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}