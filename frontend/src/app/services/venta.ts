import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService {

  // URL base del backend para ventas
  private api = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todas las ventas
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtiene una venta por su ID
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Registra una nueva venta con sus detalles
  guardar(venta: any): Observable<any> {
    return this.http.post<any>(this.api, venta);
  }

  // Elimina una venta por ID (solo admin)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Obtiene el resumen completo para el dashboard (métricas, gráficos, tablas)
  obtenerResumenDashboard(anio: number): Observable<any> {
    return this.http.get<any>(`${this.api}/dashboard/resumen?anio=${anio}`);
  }

  // Obtiene las últimas N ventas registradas
  ultimasVentas(cantidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/ultimas?cantidad=${cantidad}`);
  }

  // Obtiene las ventas registradas en el día de hoy (para la caja)
  ventasDeHoy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/hoy`);
  }
}