import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    
    `
      img {

        margin-top: 10px;
        width: 400px;
        max-width: 100%;
        border-radius: 20px;
        box-shadow: 4px 4px 4px 5px rgba(0.21, 0.21, 0.21, 0.21), 4px 4px 4px 4px rgba(0.24, 0.24, 0.24, 0.24);
        height: 500px;
      }
      
      .mat-background {

        background-color: #7b1fa2 !important;
      }

      .tamaño-fuente {

        font-size: 15px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  @ViewChild('imagen') imagenHeroe!:ElementRef<HTMLImageElement>;

  public error!: HttpErrorResponse;

  public heroe!: Heroe;

  public imgLoad: boolean = false;

  constructor(
    
    private activatedRoute: ActivatedRoute,

    private heroesService: HeroesService,

    private router:Router,
    
  ) {};

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe( switchMap( ( {id} ) => this.heroesService.getHeroesPorId( id ) ) )
    .subscribe( 
      
      (heroe) => {
        
        this.heroe = heroe;
      },

      (error) => {
          
        console.error(error);

        this.error = error;
      },
    );
  };

  irListado(): void {

    this.router.navigate( ['/heroes/listado'] );
  };

  irBuscador(): void {

    this.router.navigate( ['/heroes/buscar'] );
  };

  irEditar(): void {

    this.router.navigate( ['/heroes/editar', this.heroe.id] );
  };

  onLoadImg(): void {

    this.imgLoad = true;
  };

  imagenError(): void {

    this.imagenHeroe.nativeElement.src = 'assets/no-image.png';
  };

};
