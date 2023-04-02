import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'direccion', 'telefono', 'email', 'carrera', 'ciclo', 'acciones'];
  dataSource: any = [];

  loading: boolean = false;

  constructor(private alumnoService: AlumnoService, private router: Router, private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAlumnos();
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAlumnos() {
    this.loading = false;
    this.alumnoService.getAlumnos()
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

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id)
      .subscribe(
        res => {
          console.log(res);
          this.getAlumnos();
        },
        err => {
          console.error(err)
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        }
      )
    this.router.navigated = false;
    this.router.navigate([this.router.url]);

    this._snackBar.open('El alumno fue eliminado correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
