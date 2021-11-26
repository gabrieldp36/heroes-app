import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _Auth: Usuario | undefined;

  constructor(private http: HttpClient) {};

  get auth (): Usuario {

    return { ...this._Auth!} ;
  };

  verificaAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem('id') ) {

      return of(false);
    };

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
    .pipe( map ( usuario => {

        this._Auth = usuario;

        return true;
      }),
    );
  };

  login(): Observable<Usuario> {

   return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
    .pipe( tap( usuario => {
      
        this._Auth = usuario;

        localStorage.setItem('id', usuario.id);
      }),
    );
  };

  loguot (): void {

    this._Auth = undefined;

    localStorage.clear();
  };
};
