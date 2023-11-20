import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Alumno } from '../models/alumno';
import { Observable, Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { StudentsDTO } from '../models/StudentsDTO';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url=`${base_url}/alumno`;
  private listaCambio=new Subject<Alumno[]>();
  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Alumno[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(alum:Alumno){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, alum, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Alumno[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<Alumno>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(a: Alumno){
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, a, {
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
  getCount():Observable<StudentsDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<StudentsDTO[]>(`${this.url}/cantidaddealumnos`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
