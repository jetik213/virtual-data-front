import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Asesoria } from '../models/asesoria';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  API_URI = '/api/v1/asesoria';

  constructor(private http: HttpClient) { }

  getAsesorias(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getAsesoria(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveAsesoria(asesoria: Asesoria): Observable<Object> {
    return this.http.post(`${this.API_URI}`, asesoria);
  }

  updateAsesoria(asesoria: Asesoria): Observable<Object> {
    return this.http.put(`${this.API_URI}`, asesoria);
  }

  deleteAsesoria(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
