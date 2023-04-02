import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  dataUser: any;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      //verificamos si el usuario existe y si está verificado
      if(user && user.emailVerified){
        this.dataUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    })
  }
}
