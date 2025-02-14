import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { FormsModule } from '@angular/forms';
import Toast from 'bootstrap/js/dist/toast';
import Modal from "bootstrap/js/dist/modal";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class CrearEmpleadoComponent {

  @ViewChild('toastSuccess') toastSuccess!: ElementRef;
  @ViewChild('toastError') toastError!: ElementRef;
  @ViewChild('crearEmpleadoModal') modalRef!: ElementRef;


  @Output() empleadoCreado = new EventEmitter<void>();

  nuevoEmpleado: Empleado = {
    idEmpleado: 0,
    numeroDocumento: '',
    nombreCompleto: '',
    sueldo: 0
  };

  cargando: boolean = false; // loader en false al inicio

  constructor(private empleadoService: EmpleadoService) {}

  onCrearEmpleado(): void {

    console.log("Número antes de enviar:", this.nuevoEmpleado.numeroDocumento);

    this.cargando = true; // Al hacer petición se activa el loader.

    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.nuevoEmpleado = { idEmpleado: 0, numeroDocumento: '', nombreCompleto: '', sueldo: 0 };
        this.mostrarToast(true);
        this.cerrarModal();
        this.empleadoCreado.emit();
      },
      error: (error) => {
        console.error('Error al crear el empleado:', error);
        this.mostrarToast(false);
      },
      complete: () => {
        this.cargando = false; // Al finalizar la petición se desactiva el loader.
      }
    });
  }

  mostrarToast(esExito: boolean): void {
    const toastElement = esExito ? this.toastSuccess.nativeElement : this.toastError.nativeElement;
    const toast = new Toast(toastElement);
    toast.show();
  }

  cerrarModal(): void {
    if (!this.modalRef) {
      console.error('modalRef no está definido');
      return;
    }

    const modalElement = this.modalRef.nativeElement;
    const modal = Modal.getInstance(modalElement);

    if (modal) {
      modal.hide(); // Cierra el modal correctamente
      modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.style.overflow = 'auto'; // Restaurar scroll automáticamente
        document.body.style.paddingRight = '0px';

        // 💡 Eliminar backdrop manualmente
        setTimeout(() => {
          document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        }, 100); // Se da un pequeño tiempo para asegurar que Bootstrap terminó la animación
      });
    }
  }




}
