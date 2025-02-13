import { Component } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss'],
  imports: [FormsModule]
})
export class CrearEmpleadoComponent {
  // valores default del empleado
  nuevoEmpleado: Empleado = {
    idEmpleado: 0,
    numeroDocumento: '',
    nombreCompleto: '',
    sueldo: 0
  };

  // injecta, el servicio de empleado
  constructor(private empleadoService: EmpleadoService) {}

  onCrearEmpleado(): void {
    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        // si tiene exito, limpia los campos
        this.nuevoEmpleado = { idEmpleado: 0, numeroDocumento: '', nombreCompleto: '', sueldo: 0 };
      },
      error: (error) => {
        console.error('Error al crear el empleado:', error);
      }
    });
  }
}
