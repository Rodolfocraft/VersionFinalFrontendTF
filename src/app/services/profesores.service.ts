import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesores } from '../models/profesores';
import {Observable, Subject} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProfesorUniversidadDTO } from '../models/ProfesorUniversidadDTO';
const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private url=`${base_url}/profesores`;
  private listaCambio=new Subject<Profesores[]>();
  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Profesores[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(prof:Profesores){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, prof, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Profesores[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<Profesores>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(p: Profesores){
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, p, {
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
  getCount():Observable<ProfesorUniversidadDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<ProfesorUniversidadDTO[]>(`${this.url}/cantidadprofesores`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
