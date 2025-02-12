import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-de-empleados',
  imports: [CommonModule],
  templateUrl: './lista-de-empleados.component.html',
  styleUrl: './lista-de-empleados.component.scss'
})
export class ListaDeEmpleadosComponent implements OnInit{
  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
      this.empleadoService.getEmpleados().subscribe( data => {
        this.empleados = data;
      })
  }
}
