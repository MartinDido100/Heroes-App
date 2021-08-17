import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth}
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('token')) {
      // return of(false)
      return of(false)
    }
    // return of(true)
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map( auth=> {
        this._auth = auth;
        return true
      } )
    )
  }


  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(auth => this._auth = auth),//Podes hacer algo antes de la subscripcion
      tap(auth => localStorage.setItem('token',auth.id))
    )
  }

  logSinUser(){
    this._auth = undefined;
    localStorage.setItem('token', '2');
  }
}
