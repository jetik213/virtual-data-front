import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { PsicologosComponent } from './psicologos/psicologos.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { GrabarAlumnoComponent } from './alumnos/grabar-alumno/grabar-alumno.component';
import { GrabarPsicologoComponent } from './psicologos/grabar-psicologo/grabar-psicologo.component';
import { GrabarAsesoriaComponent } from './asesorias/grabar-asesoria/grabar-asesoria.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    AlumnosComponent,
    PsicologosComponent,
    AsesoriasComponent,
    GrabarAlumnoComponent,
    GrabarPsicologoComponent,
    GrabarAsesoriaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
