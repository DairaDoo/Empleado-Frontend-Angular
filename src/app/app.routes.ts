import { Routes, RouterModule } from '@angular/router';
import { ListaDeEmpleadosComponent } from './components/lista-de-empleados/lista-de-empleados.component';

export const routes: Routes = [
    {path: 'empleados', component: ListaDeEmpleadosComponent},
    {path: '**', redirectTo: 'empleados'} // redireccionar al home automáticamente.
];
