import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class RolService {

  // URL base del backend para roles
  private api = `${environment.apiUrl}/api/roles`;


  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los roles disponibles
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}