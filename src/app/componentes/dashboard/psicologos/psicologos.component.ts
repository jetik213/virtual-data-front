import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PsicologoService } from 'src/app/services/psicologo.service';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./psicologos.component.css']
})
export class PsicologosComponent implements OnInit {
   
  displayedColumns: string[] = ['id', 'dni', 'nombre', 'direccion', 'telefono', 'email', 'acciones'];
  dataSource: any = [];

  loading: boolean = false;

  constructor(private psicologoService: PsicologoService, private router: Router, private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getPsicologos();
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPsicologos() {
    this.loading = false;
    this.psicologoService.getPsicologos()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = true;
        },
        err => console.error(err)
      );    
  }

  deletePsicologo(id: number) {
    this.psicologoService.deletePsicologo(id)
      .subscribe(
        res => {
          console.log(res);
          this.getPsicologos();
        },
        err => {
          console.error(err)
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        }
      )
    this.router.navigated = false;
    this.router.navigate([this.router.url]);

    this._snackBar.open('El psicólogo fue eliminado correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}