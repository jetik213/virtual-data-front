import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Psicologo } from '../models/psicologo';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {

  API_URI = '/api/v1/psicologo';

  constructor(private http: HttpClient) { }

  getPsicologos(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getPsicologo(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  savePsicologo(psicologo: Psicologo): Observable<Object> {
    return this.http.post(`${this.API_URI}`, psicologo);
  }

  updatePsicologo(psicologo: Psicologo): Observable<Object> {
    return this.http.put(`${this.API_URI}`, psicologo);
  }

  deletePsicologo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
