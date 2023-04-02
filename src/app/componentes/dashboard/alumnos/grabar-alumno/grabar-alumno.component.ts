import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grabar-alumno',
  templateUrl: './grabar-alumno.component.html',
  styleUrls: ['./grabar-alumno.component.css']
})
export class GrabarAlumnoComponent implements OnInit {
  
  alumno!: Alumno;

  edit: boolean = false;

  carrera: any[] = [
    { id: 1, nombre: "Computación e Informática" },
    { id: 2, nombre: "Administración y Sistemas" },
    { id: 3, nombre: "Industrial y Sistemas" },
    { id: 4, nombre: "Administración de Redes y Comunicaciones" },
    { id: 5, nombre: "Arquitectura de datos" },
    { id: 6, nombre: "Dibujo de Arquitectura y Obras Civiles" },
    { id: 7, nombre: "Seguridad y Prevención de Riesgos" },
    { id: 8, nombre: "Mecatrónica Industrial" },
    { id: 9, nombre: "Electricidad Industrial" },
    { id: 10, nombre: "Mecánica Automotriz" },
  ];

  ciclo: any[] = [
    { id: 1, ciclo: "Primer Ciclo" },
    { id: 2, ciclo: "Segundo Ciclo" },
    { id: 3, ciclo: "Tercer Ciclo" },
    { id: 4, ciclo: "Cuarto Ciclo" },
    { id: 5, ciclo: "Quinto Ciclo" },
    { id: 6, ciclo: "Sexto Ciclo" },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private router: Router, private _snackBar: MatSnackBar,  private activatedRoute: ActivatedRoute){
    this.form = this.fb.group({
      id: [0, Validators.required],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      carrera: {
        id: [0, Validators.required],
        nombre: ['', Validators.required]
      },
      ciclo: {
        id: [0, Validators.required],
        ciclo: ['', Validators.required]
      }
    })
  }

  carreraSeleccionada: any;
  cicloSeleccionado: any;

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.alumnoService.getAlumno(params['id'])
        .subscribe(
          res => {
            if (res) {
              console.log(res);
              this.form.get('id')?.setValue(res.id);
              this.form.get('codigo')?.setValue(res.codigo);
              this.form.get('nombre')?.setValue(res.nombre);
              this.form.get('direccion')?.setValue(res.direccion);
              this.form.get('telefono')?.setValue(res.telefono);
              this.form.get('email')?.setValue(res.email);
              this.form.get('carrera')?.get('id')?.setValue(res.carrera.id);
              this.form.get('carrera')?.get('nombre')?.setValue(res.carrera.nombre);
              this.form.get('ciclo')?.get('id')?.setValue(res.ciclo.id);
              this.form.get('ciclo')?.get('ciclo')?.setValue(res.ciclo.ciclo);
              this.carreraSeleccionada = res.carrera.id;
              this.cicloSeleccionado = res.ciclo.id;
              this.edit = true;
            }
          },
          err => console.log(err)
        )
    }
  }

  saveAlumno() {

    const carrera = this.carrera.find(carrera => carrera.id == this.form.value.carrera);
    const ciclo = this.ciclo.find(ciclo => ciclo.id == this.form.value.ciclo);

    this.alumno = {
      id: this.form.value.id,
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      carrera: {
        id: carrera.id,
        nombre: carrera.nombre
      },
      ciclo: {
        id: ciclo.id,
        ciclo: ciclo.ciclo
      }
    }
    console.log(this.alumno);


    if(this.edit){
      this.alumnoService.updateAlumno(this.alumno)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/alumnos']);
        },
        err => console.error(err)
      )

      this._snackBar.open('El Alumno se editó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    } else {
      delete this.alumno.id;
      this.alumnoService.saveAlumno(this.alumno)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/alumnos']);
        },
        err => console.error(err)
      )

      this._snackBar.open('El Alumno se agregó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    }
  }
}
