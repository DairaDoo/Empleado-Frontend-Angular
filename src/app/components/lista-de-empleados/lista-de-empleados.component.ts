import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearEmpleadoComponent } from "../crear-empleado/crear-empleado.component";

@Component({
  selector: 'app-lista-de-empleados',
  imports: [CommonModule, FormsModule, CrearEmpleadoComponent],
  templateUrl: './lista-de-empleados.component.html',
  styleUrls: ['./lista-de-empleados.component.scss']
})
export class ListaDeEmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  cargando: boolean = false; // Controlador del spinner
  searchText: string = ''; // Texto de búsqueda

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.cargando = true; // Muestra el spinner
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.empleadosFiltrados = data; // Al cargar los empleados, se muestran todos por defecto
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      },
      complete: () => {
        this.cargando = false; // Oculta el spinner cuando termina
      }
    });
  }

  // Método que filtra los empleados según el texto de búsqueda
  filtrarEmpleados(): void {
  if (this.searchText.trim() === '') {
    this.empleadosFiltrados = this.empleados;
  } else {
    this.empleadosFiltrados = this.empleados.filter((empleado) =>
      empleado.nombreCompleto.toLowerCase().includes(this.searchText.toLowerCase()) ||
      empleado.numeroDocumento.toLowerCase().includes(this.searchText.toLowerCase()) ||
      empleado.idEmpleado.toString().includes(this.searchText) // Filtro por ID
    );
  }
}

}
