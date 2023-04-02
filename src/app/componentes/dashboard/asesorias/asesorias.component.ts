import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AsesoriaService } from 'src/app/services/asesoria.service';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent implements OnInit {

   
  displayedColumns: string[] = ['id', 'alumno', 'psicologo', 'fecha', 'horario', 'acciones'];

  dataSource: any = [];

  loading: boolean = false;

  constructor(private asesoriaService: AsesoriaService, private router: Router, private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAsesorias();
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAsesorias() {
    this.loading = false;
    this.asesoriaService.getAsesorias()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res);
          this.loading = true;
        },
        err => console.error(err)
      );    
  }

  deleteAsesoria(id: number) {
    this.asesoriaService.deleteAsesoria(id)
      .subscribe(
        res => {
          console.log(res);
          this.getAsesorias();
        },
        err => {
          console.error(err)
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        }
      )
    this.router.navigated = false;
    this.router.navigate([this.router.url]);

    this._snackBar.open('La asesoría fue eliminada correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}