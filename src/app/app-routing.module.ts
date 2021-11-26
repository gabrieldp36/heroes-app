import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },

  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
 
  imports: [

    RouterModule.forRoot(routes),
  ],

  exports: [

    RouterModule,
  ],
})
export class AppRoutingModule {};
