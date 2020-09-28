import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user.pipe(
        take(1),
        map(
          //  user => user && user.roles.admin ? true : false
          user => {

          if(user !==null && user.roles.admin){
            return true;
          }
          else return false;
        }
        ),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied - you don have role please signin.')
            this.router.navigate(['login'])
          }})
      );
    }


    }

