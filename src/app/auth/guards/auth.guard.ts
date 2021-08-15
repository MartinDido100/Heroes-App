import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

//LazyLoad: Canact y canLoad
//No Lazyload: canAct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
      // if (this.authService.auth.id) {
      //   return true
      // }
      //   return false
      return this.authService.verificaAutenticacion().pipe(
        tap(estaAutenticado =>{
          if(!estaAutenticado){
            this.router.navigate(['./auth/login']);
          }
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.auth.id) {
    //   return true
    // }
    //   return false
    return this.authService.verificaAutenticacion().pipe(
      tap(estaAutenticado =>{
        if(!estaAutenticado){
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}
