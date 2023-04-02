import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Psicologo } from 'src/app/models/psicologo';
import { PsicologoService } from 'src/app/services/psicologo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grabar-psicologo',
  templateUrl: './grabar-psicologo.component.html',
  styleUrls: ['./grabar-psicologo.component.css']
})
export class GrabarPsicologoComponent {

  psicologo!: Psicologo;

  edit: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private psicologoService: PsicologoService, private router: Router, private _snackBar: MatSnackBar,  private activatedRoute: ActivatedRoute){
    this.form = this.fb.group({
      id: [0, Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.psicologoService.getPsicologo(params['id'])
        .subscribe(
          res => {
            if (res) {
              console.log(res);
              this.form.get('id')?.setValue(res.id);
              this.form.get('dni')?.setValue(res.dni);
              this.form.get('nombre')?.setValue(res.nombre);
              this.form.get('direccion')?.setValue(res.direccion);
              this.form.get('telefono')?.setValue(res.telefono);
              this.form.get('email')?.setValue(res.email);
              this.edit = true;
            }
          },
          err => console.log(err)
        )
    }
  }

  savePsicologo() {

    this.psicologo = {
      id: this.form.value.id,
      dni: this.form.value.dni,
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      email: this.form.value.email
    }
    console.log(this.psicologo);


    if(this.edit){
      this.psicologoService.updatePsicologo(this.psicologo)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/psicologos']);
        },
        err => console.error(err)
      )

      this._snackBar.open('El Psicólogo se editó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    } else {
      delete this.psicologo.id;
      this.psicologoService.savePsicologo(this.psicologo)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard/psicologos']);
        },
        err => console.error(err)
      )

      this._snackBar.open('El Psicólogo se agregó correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    }
  }
}
