import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

import { MatDialog } from '@angular/material/dialog';;

import { MatSnackBar } from '@angular/material/snack-bar';

import { switchMap } from 'rxjs/operators';

import { of } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { RellenarCamposComponent } from '../../components/rellenar-campos/rellenar-campos.component';

import { Publisher, Publishers, Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [

    `
      img {

        width: 400px;
        max-width: 100%;
        border-radius: 20px;
        box-shadow: 4px 4px 4px 5px rgba(0.21, 0.21, 0.21, 0.21), 4px 4px 4px 4px rgba(0.24, 0.24, 0.24, 0.24);
        height: 500px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  @ViewChild('imagen') imagenHeroe!:ElementRef<HTMLImageElement>;
  
  public srcImg: string = '';

  public publishers: Publishers[] = [

    {
      id: 'DC Comics',
      desc:'DC - Comics',
    },

    {
      id: 'Marvel Comics',
      desc:'Marvel - Comics',
    },      
  ];

  public heroe:Heroe = {

    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    publisher: Publisher.DCComics,
    habilities: '',
    alt_img: '',
  };

  constructor(
    
    private heroesService: HeroesService,

    private activatedRoute: ActivatedRoute,

    private router: Router,

    private snakBar: MatSnackBar,

    private dialog: MatDialog,

  ) {};

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) { return; };

    this.activatedRoute.params
    .pipe( switchMap ( ({id})  => this.heroesService.getHeroesPorId(id) ) )
    .subscribe( 
      
      (heroe) => {

        this.heroe = heroe
      },
    );
  };

  buscar(): void {

    if ( (this.heroe.superhero?.trim().length || 0) === 0 ) {

      this.dialog.open(RellenarCamposComponent);
      
      return;

    } else if ( (this.heroe.alter_ego?.trim().length || 0) === 0 ) {
      
      this.dialog.open(RellenarCamposComponent);
      
      return;
    
    } else if ( (this.heroe.habilities?.trim().length || 0) === 0 ) {

      this.dialog.open(RellenarCamposComponent);

      return;
    };

    if (this.heroe.id) {

      // Actualizar héroe.

      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => {

        this.router.navigate(['heroes/', heroe.id]);
      });

    } else {

      // Crear héroe.

      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( heroe => {

        this.router.navigate(['heroes/editar', heroe.id]);

        this.mostrarSnackBar('Héroe creado con éxito!');
      });
    };
  };

  // Borrar héroe.

  borrarHeroe(): void {

    const dialog = this.dialog.open(ConfirmarComponent, {

      width: '300px',
      panelClass:['dialogConfirm'],
      data: {...this.heroe},
    });

    dialog.afterClosed()
    .pipe( switchMap( (result) => (result) ? this.heroesService.borrarHeroe(this.heroe.id!) : of(false) ) )
    .subscribe( resp => {

      if (resp !== false) {

        this.router.navigate(['heroes/listado']);
      };
    });
  };

  imagenError(): void {

    this.imagenHeroe.nativeElement.src = 'assets/no-image.png';
  };

  mostrarSnackBar (mensaje:string): void {

    this.snakBar.open( mensaje, 'Cerrar', {duration: 2000, panelClass: ['snakBarGuardar']} );
  };
};
