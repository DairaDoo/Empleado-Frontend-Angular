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
  nuevoEmpleado: Empleado = {
    idEmpleado: 0,
    numeroDocumento: '',
    nombreCompleto: '',
    sueldo: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }
}
