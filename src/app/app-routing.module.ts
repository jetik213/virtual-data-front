import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './componentes/dashboard/alumnos/alumnos.component';
import { GrabarAlumnoComponent } from './componentes/dashboard/alumnos/grabar-alumno/grabar-alumno.component';
import { AsesoriasComponent } from './componentes/dashboard/asesorias/asesorias.component';
import { GrabarAsesoriaComponent } from './componentes/dashboard/asesorias/grabar-asesoria/grabar-asesoria.component';
import { GrabarPsicologoComponent } from './componentes/dashboard/psicologos/grabar-psicologo/grabar-psicologo.component';
import { PsicologosComponent } from './componentes/dashboard/psicologos/psicologos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  { path: 'verificar-correo', component: VerificarCorreoComponent},
  { path: 'recuperar-password', component: RecuperarPasswordComponent},
  { path: 'dashboard', loadChildren: () => import('./componentes/dashboard/dashboard.module').then(x => x.DashboardModule) },
  //{ path: '**', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'alumnos',
    component: AlumnosComponent
  },
  {
    path: 'dashboard/grabar-alumno',
    component: GrabarAlumnoComponent
  },
  {
    path: 'dashboard/grabar-alumno/:id',
    component: GrabarAlumnoComponent
  },
  {
    path: 'psicologos',
    component: PsicologosComponent
  },
  {
    path: 'dashboard/grabar-psicologo',
    component: GrabarPsicologoComponent
  },
  {
    path: 'dashboard/grabar-psicologo/:id',
    component: GrabarPsicologoComponent
  },
  {
    path: 'asesorias',
    component: AsesoriasComponent
  },
  {
    path: 'dashboard/grabar-asesoria',
    component: GrabarAsesoriaComponent
  },
  {
    path: 'dashboard/grabar-asesoria/:id',
    component: GrabarAsesoriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
