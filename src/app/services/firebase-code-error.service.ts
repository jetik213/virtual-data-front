import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {
    switch(code) {

      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe'
      //Contraseña debil
      case FirebaseCodeErrorEnum.PasswordWeak:
        return 'Contraseña muy debil'
      //correo inválido
      case FirebaseCodeErrorEnum.InvalidEmail:
         return 'Correo inválido'
      //Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
         return 'Contraseña incorrecta'
      //Usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
         return 'Usuario ingresado no existe'
      default:
        return 'Error desconocido'
    }
  }
}
