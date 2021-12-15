import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [

    `
    .card-fondo{
      
      background: rgba(0,0,0,0.2) !important;
      box-shadow: 0px 0px 4px 5px rgba(0.21, 0.21, 0.21, 0.21), 0px 0px 4px 4px rgba(0.24, 0.24, 0.24, 0.24) !important;
    }
    `
  ]
})
export class LoginComponent  {

  constructor(

    private authService: AuthService,

    private router: Router

  ) {};

  login(): void {

    this.authService.login().subscribe(

      (resp) => {
        
      if (resp.id) {

        this.router.navigate(['./heroes']);
      };

    });
  };
};
