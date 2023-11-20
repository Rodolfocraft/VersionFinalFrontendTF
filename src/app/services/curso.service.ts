import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Curso } from '../models/curso';
import { CursoUniversidadDTO } from '../models/CursoUniversidadDTO';
const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url=`${base_url}/curso`;
  private listaCambio=new Subject<Curso[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Curso[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(prof:Curso){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, prof, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Curso[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<Curso>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(p: Curso){
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
  getCount():Observable<CursoUniversidadDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<CursoUniversidadDTO[]>(`${this.url}/cantidadcursos`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
