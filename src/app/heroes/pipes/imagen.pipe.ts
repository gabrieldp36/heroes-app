import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  pure: true,
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe, srcImg: string = ''): string {

    if (!heroe.id) {

      return 'assets/no-image.png';

    } else if (!heroe.alt_img && !heroe.assets_img) {

      return 'assets/no-image.png';

    } else if (heroe.alt_img) {

      if (srcImg) {

        return srcImg;

      } else {

        return heroe.alt_img;
      };

    } else {

      return `assets/heroes/${heroe.id}.jpg`;
    }
  };
};
