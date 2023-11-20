import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private lService:LoginService, private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const rpta=this.lService.verificar();
    if(!rpta){
      this.router.navigate(['/login']);
      return false;
    }
    return rpta;
  }
  
}