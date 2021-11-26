import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Heroe } from '../interfaces/heroes.interfaces';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {};

  getHeroes(): Observable<Heroe[]> {

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  };

  getHeroesPorId(id: string): Observable<Heroe> {

    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  };

  getSugerencias(termino: string): Observable<Heroe[]> {

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=5`);
  };

  agregarHeroe(heroe: Heroe): Observable<Heroe> {

    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  };

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {

    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  };

  borrarHeroe(id: string): Observable<{}> {

    return this.http.delete<{}>(`${this.baseUrl}/heroes/${id}`);
  };
};
