import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent {

  constructor(

    private dialogRef: MatDialogRef<ConfirmarComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Heroe,

  ) {};

  cancelar(): void {

    this.dialogRef.close();
  };

  borrar():void {

    this.dialogRef.close(true);
  };
};
