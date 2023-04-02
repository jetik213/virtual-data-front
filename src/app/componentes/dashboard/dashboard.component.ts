import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  loading: boolean = false;
  dataUser: any;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      //verificamos si el usuario existe y si está verificado
      if(user && user.emailVerified){
        this.dataUser = user;
        this.loading = true;
      } else {
        this.router.navigate(['/login']);
      }
    })
  }


}
