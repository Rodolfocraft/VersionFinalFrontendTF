import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { CarreraProfesional } from '../models/carreraprofesional';
const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class CarreraprofesionalService {
  private url=`${base_url}/CarrerasProfesionales`;
  private listaCambio=new Subject<CarreraProfesional[]>();
  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<CarreraProfesional[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(carr:CarreraProfesional){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, carr, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:CarreraProfesional[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<CarreraProfesional>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c: CarreraProfesional){
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
}
