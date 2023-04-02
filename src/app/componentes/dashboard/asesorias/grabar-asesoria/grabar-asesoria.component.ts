import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asesoria } from 'src/app/models/asesoria';
import { AsesoriaService } from 'src/app/services/asesoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PsicologoService } from 'src/app/services/psicologo.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-grabar-asesoria',
  templateUrl: './grabar-asesoria.component.html',
  styleUrls: ['./grabar-asesoria.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // aquí se establece el idioma a español
  ]
})
export class GrabarAsesoriaComponent {
  
  asesoria!: Asesoria;

  edit: boolean = false;

  horario: any[] = [
    { id: 1, nombre: "08:00-10:00" },
    { id: 2, nombre: "10:00-12:00" },
    { id: 3, nombre: "12:00-14:00" },
    { id: 4, nombre: "14:00-16:00" },
    { id: 5, nombre: "16:00-18:00" },
  ];  

  form: FormGroup;

  alumno: any[] = [];
  psicologo: any[] = [];

  constructor(private fb: FormBuilder, private asesoriaService: AsesoriaService, private alumnoService: AlumnoService, private psicologoService: PsicologoService, private router: Router, private _snackBar: MatSnackBar,  private activatedRoute: ActivatedRoute, private dateAdapter:DateAdapter<Date>){
    this.dateAdapter.setLocale('es-ES');
    this.form = this.fb.group({
      id: [0, Validators.required],
      alumno: {
        id: [0, Validators.required],
        nombre: ['', Validators.required]
      },
      psicologo: {
        id: [0, Validators.required],
        nombre: ['', Validators.required]
      },
      fecha: [null, Validators.required],
      horario: {
        id: [0, Validators.required],
        nombre: ['', Validators.required]
      }
    })
  }

  alumnoSeleccionado: any;
  psicologoSeleccionado: any;
  horarioSeleccionado: any;

  getAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      alumnos => this.alumno = alumnos
    ); 
  }

  getPsicologos() {
    this.psicologoService.getPsicologos().subscribe(
      psicologos => this.psicologo = psicologos
    );   
  }

  ngOnInit(): void {

    //this.getAlumnos;
    //this.getPsicologos;

    this.alumnoService.getAlumnos().subscribe(
      alumnos => this.alumno = alumnos
    ); 
    this.psicologoService.getPsicologos().subscribe(
      psicologos => this.psicologo = psicologos
    ); 

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.asesoriaService.getAsesoria(params['id'])
        .subscribe(
          res => {
            if (res) {
              console.log(res);
              this.form.get('id')?.setValue(res.id);
              this.form.get('alumno')?.get('id')?.setValue(res.alumno.id);
              this.form.get('alumno')?.get('nombre')?.setValue(res.alumno.nombre);
              this.form.get('psicologo')?.get('id')?.setValue(res.psicologo.id);
              this.form.get('psicologo')?.get('nombre')?.setValue(res.psicologo.ciclo);
              this.form.get('fecha')?.setValue(res.fecha);
              this.form.get('horario')?.get('id')?.setValue(res.horario.id);
              this.form.get('horario')?.get('nombre')?.setValue(res.horario.nombre);
              this.alumnoSeleccionado = res.alumno.id;
              this.psicologoSeleccionado = res.psicologo.id;
              this.horarioSeleccionado = res.horario.id;
              this.edit = true;
            }
          },
          err => console.log(err)
        )
    }
  }

  saveAsesoria() {

    const alumno = this.alumno.find(alumno => alumno.id == this.form.value.alumno);
    const psicologo = this.psicologo.find(psicologo => psicologo.id == this.form.value.psicologo);
    const horario = this.horario.find(horario => horario.id == this.form.value.horario);

    this.asesoria = {
      id: this.form.value.id,
      alumno: {
        id: alumno.id,
        nombre: alumno.nombre
      },
      psicologo: {
        id: psicologo.id,
        nombre: psicologo.nombre
      },
      fecha: this.form.value.fecha,
      horario: {
        id: horario.id,
        nombre: horario.nombre
      },
    }
    console.log(this.asesoria);


    if(this.edit){
      this.asesoriaService.updateAsesoria(this.asesoria)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/asesorias']);
        },
        err => console.error(err)
      )

      this._snackBar.open('La Asesoria se editó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    } else {
      delete this.asesoria.id;
      this.asesoriaService.saveAsesoria(this.asesoria)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/asesorias']);
        },
        err => console.error(err)
      )

      this._snackBar.open('La Asesoria se agregó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    }
  }
}

