import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalificacionDocente } from '../models/calificaciondocente';
import { Observable, Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AlumnoCalificacionDocenteDTO } from '../models/AlumnoCalificacionDocenteDTO';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class CalificaciondocenteService {
  private url=`${base_url}/calificacionDocente`;
  private listaCambio=new Subject<CalificacionDocente[]>();
  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<CalificacionDocente[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(calf:CalificacionDocente){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, calf, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:CalificacionDocente[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<CalificacionDocente>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c: CalificacionDocente){
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, c, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getCount():Observable<AlumnoCalificacionDocenteDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<AlumnoCalificacionDocenteDTO[]>(`${this.url}/cantidadCalificaciones`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
