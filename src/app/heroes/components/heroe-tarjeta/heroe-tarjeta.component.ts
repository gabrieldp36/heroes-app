import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    
    `
      mat-card{

        margin-top: 25px;
      }
    `
  ]
})
export class HeroeTarjetaComponent {

  @ViewChild('imagen') imagenHeroe!:ElementRef<HTMLImageElement>;

  @Input() heroe!: Heroe;

  imagenError(): void {

    this.imagenHeroe.nativeElement.src = 'assets/no-image.png';
  };
};
