import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuServices: MenuService, private afAuth: AngularFireAuth, private router: Router) { }
  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(){
    this._menuServices.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']))
    .catch((error) => {
      console.log(error);
    });
  }
}
