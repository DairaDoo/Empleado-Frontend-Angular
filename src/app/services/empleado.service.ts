import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/Lista`);
  }

  // Metodo para obtener empleado por id.
  getEmpleado(id: number):Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/Obtener/${id}`);
  }

  // Metodo para crear un empleado
  crearEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post('http://localhost:5034/api/Empleado/Crear', empleado, { responseType: 'text' });
  }

  // Metodo para editar empleado
  editarEmpleado(empleado: Empleado): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/Editar`, empleado);
  }

  // Metodo para eliminar empleado
  eliminarEmpleado(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Eliminar?id=${id}`, { responseType: 'text' as 'json' });
  }

}
