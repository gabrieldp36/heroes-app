import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';

import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [

   `
    .containers {

      margin: 15px;
    }
   `
  ]
})
export class HomeComponent {

  constructor(

    private authService: AuthService,
    
    private router: Router,
    
  ) {};

  get usuario (): Usuario {

    return this.authService.auth;
  };

  logout(): void {

    this.authService.loguot();

    this.router.navigate(['./auth']);
  };
};
