import { Component, OnInit } from "@angular/core";
import { EmpleadoService } from "../../services/empleado.service";
import { Empleado } from "../../models/empleado";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CrearEmpleadoComponent } from "../crear-empleado/crear-empleado.component";

declare var bootstrap: any;

@Component({
  selector: "app-lista-de-empleados",
  imports: [CommonModule, FormsModule, CrearEmpleadoComponent],
  templateUrl: "./lista-de-empleados.component.html",
  styleUrls: ["./lista-de-empleados.component.scss"],
})
export class ListaDeEmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  cargando: boolean = false;
  searchText: string = "";
  empleadoSeleccionado: Empleado | null = null;
  modalActualizar: any;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.modalActualizar = new bootstrap.Modal(document.getElementById('editarEmpleadoModal'));
  }

  cargarEmpleados(): void {
    this.cargando = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.empleadosFiltrados = data;
      },
      error: (error) => console.error("Error al cargar empleados:", error),
      complete: () => (this.cargando = false),
    });
  }

  filtrarEmpleados(): void {
    this.empleadosFiltrados = this.searchText.trim() === ""
      ? this.empleados
      : this.empleados.filter(empleado =>
          empleado.nombreCompleto.toLowerCase().includes(this.searchText.toLowerCase()) ||
          empleado.numeroDocumento.toLowerCase().includes(this.searchText.toLowerCase()) ||
          empleado.idEmpleado.toString().includes(this.searchText)
        );
  }

  eliminarEmpleado(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => this.cargarEmpleados(),
        error: (error) => console.error("Error al eliminar empleado:", error),
      });
    }
  }

  seleccionarEmpleado(empleado: Empleado): void {
    this.empleadoSeleccionado = { ...empleado };
    this.modalActualizar.show();
  }

  actualizarEmpleado(): void {
  if (this.empleadoSeleccionado) {
    this.empleadoService.editarEmpleado(this.empleadoSeleccionado).subscribe({
      next: () => {
        this.cargarEmpleados();
        this.empleadoSeleccionado = null; // Resetear selección
        this.modalActualizar.hide();
      },
      error: (error) => console.error("Error al actualizar empleado:", error),
    });
  }
}


}
