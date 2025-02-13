import { Component, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { FormsModule } from '@angular/forms';
import Toast from 'bootstrap/js/dist/toast';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss'],
  imports: [FormsModule]
})
export class CrearEmpleadoComponent {

  @ViewChild('toastSuccess') toastSuccess!: ElementRef;
  @ViewChild('toastError') toastError!: ElementRef;

  nuevoEmpleado: Empleado = {
    idEmpleado: 0,
    numeroDocumento: '',
    nombreCompleto: '',
    sueldo: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  onCrearEmpleado(): void {
    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.nuevoEmpleado = { idEmpleado: 0, numeroDocumento: '', nombreCompleto: '', sueldo: 0 };
        this.mostrarToast(true);
      },
      error: (error) => {
        console.error('Error al crear el empleado:', error);
        this.mostrarToast(false);
      }
    });
  }

  mostrarToast(esExito: boolean): void {
    const toastElement = esExito ? this.toastSuccess.nativeElement : this.toastError.nativeElement;
    const toast = new Toast(toastElement);
    toast.show();
  }
}
