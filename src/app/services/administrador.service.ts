import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs'
import { Administrador } from '../models/administrador';


const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private url=`${base_url}/administrador`;
  private listaCambio=new Subject<Administrador[]>();
  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Administrador[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(soli:Administrador){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, soli, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Administrador[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<Administrador>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(s: Administrador){
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, s, {
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
