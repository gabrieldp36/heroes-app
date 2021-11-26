import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rellenar-campos',
  templateUrl: './rellenar-campos.component.html',
  styles: [
  ]
})
export class RellenarCamposComponent  {

  constructor ( private dialogRef: MatDialogRef<RellenarCamposComponent> ) {};

  cerrar(): void {

    this.dialogRef.close();
  };
};
