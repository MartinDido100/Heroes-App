import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

//Components
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'auth',
    loadChildren: () => import( './auth/auth.module' ).then(m => m.AuthModule),
    //Cuando se entra a ese path cargo el modulo, devuelve una promesa
  },
  {
    path: 'heroes',
    loadChildren: () => import ('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [ AuthGuard ],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
