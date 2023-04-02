import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PsicologosComponent } from './psicologos/psicologos.component';
import { GrabarAlumnoComponent } from './alumnos/grabar-alumno/grabar-alumno.component';
import { GrabarPsicologoComponent } from './psicologos/grabar-psicologo/grabar-psicologo.component';
import { GrabarAsesoriaComponent } from './asesorias/grabar-asesoria/grabar-asesoria.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'alumnos', component: AlumnosComponent},
    { path: 'grabar-alumno', component: GrabarAlumnoComponent},
    { path: 'psicologos', component: PsicologosComponent},
    { path: 'grabar-psicologo', component: GrabarPsicologoComponent},
    { path: 'asesorias', component: AsesoriasComponent},
    { path: 'grabar-asesoria', component: GrabarAsesoriaComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
