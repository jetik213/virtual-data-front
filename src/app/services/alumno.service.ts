import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  API_URI = '/api/v1/alumno';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getAlumno(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveAlumno(alumno: Alumno): Observable<Object> {
    return this.http.post(`${this.API_URI}`, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Object> {
    return this.http.put(`${this.API_URI}`, alumno);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
