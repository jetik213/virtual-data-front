import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recuperarPassword: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.recuperarPassword = this.fb.group({
      email: ['', Validators.required]
    });
  }
  ngOnInit(): void {}

  recuperar(){
    const email = this.recuperarPassword.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {

      this.toastr.info('Se envió un correo para restablecer su contraseña','Recuperar Contraseña')
      this.router.navigate(['/login']);
    }).catch((error) =>{
      console.log(error);
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code));
    });
  }
}
