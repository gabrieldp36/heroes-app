import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  public error: boolean = false;

  public heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {};

  ngOnInit(): void {

    this.heroesService.getHeroes()
    .subscribe( 
      
      (heroes) => {

        this.error = false;
          
        this.heroes = heroes;
      },

      (error) => {
          
        console.error(error);

        this.error = true;
      },
    );
  };
};
