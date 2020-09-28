import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CanViewGuard implements CanActivate  {
  routePermission:Observable<boolean>;
  constructor(private auth:AuthService,
    private router:Router){
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user.pipe(
        take(1),
        map(
          user => {
          if(user !== null && (user.roles.user || user.roles.admin)){
            return true;
          }
          else return false;
        }
        ),
        tap(isUser => {
          if (isUser==false) {
            alert('access denied')
            console.error('Access denied - Login first')
            this.router.navigate(['login'])
          }}
        )
          )
        };
}
