import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [

    `
       .mat-background {

        background-color: #5dcebc !important;
        height: 55px;
      }

      .inpt-width {
        width:60%;
        
      }
    `
  ]
})
export class BuscarComponent {

  public termino: string = '';

  public heroes: Heroe[] = [];

  public sinResultados: boolean = false;
  
  constructor(

    private heroesService: HeroesService,
    
    private router:Router,
    
  ) {};

  buscarSugerencias(): void {

    if ( this.termino.trim().length > 0 ) {

      this.heroesService.getSugerencias(this.termino)
      .subscribe( 
        
      heroes => {
        
        this.heroes = heroes;

        (this.heroes.length === 0) ? this.sinResultados = true : this.sinResultados = false;
      });
    };

    (this.termino.length === 0) ? this.heroes = [] : '';
  };

  mostrarHeroe(event: MatAutocompleteSelectedEvent): void {

    if (!event.option.value) { return; };
        
    const heroe: Heroe = event.option.value;

    this.router.navigate( [`/heroes/${heroe.id}`] );
      
  };

  limpiarSugerencias (): void {

    setTimeout(() => {

      this.heroes = [];

    }, 390);

    this.termino = '';
  };
};
