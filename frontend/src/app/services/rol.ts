import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolService {

  // URL base del backend para roles
  private api = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los roles disponibles
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}