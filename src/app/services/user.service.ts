import { Injectable } from '@angular/core';
import { Users } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioGeneroDTO } from '../models/UsuarioGeneroDTO';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url=`${base_url}/users`;
  private listaCambio=new Subject<Users[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Users[]>(this.url);
  }

  insert(user:Users){
    return this.http.post<Users[]>(this.url,user);
  }

  setList(listaNueva:Users[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number){
    return this.http.get<Users>(`${this.url}/${id}`);
  }
  update(u: Users){
    return this.http.put(this.url,u);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listUsername(name:String){
    return this.http.get<Users>(`${this.url}/username/${name}`)
  }
  getCount():Observable<UsuarioGeneroDTO[]>{
    return this.http.get<UsuarioGeneroDTO[]>(`${this.url}/cantidadporgenero`);
  }
}
