import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSecretaryComponent } from './shared/main-secretary/main-secretary.component';
import { MainManagerComponent } from './shared/main-manager/main-manager.component';
import { MainAdminerComponent } from './shared/main-adminer/main-adminer.component';
import { LoginComponent } from './public/login/login.component';
import { Page404Component } from './page/page404/page404.component';

const routes: Routes = [
  // {  path:'user/register'  ,component:HomeComponent },
  // {  path:'user/login'     ,component:HomeComponent },
  // {  path:'user/profile'   ,component:HomeComponent },
  // {  path:'book/:id'       ,component:HomeComponent },
  // {  path:'**'             , component: Page404Component}, //Si la ruta no existe
  { path: 'secretary', component: MainSecretaryComponent },
  { path: 'manager', component: MainManagerComponent },
  { path: 'adminer', component: MainAdminerComponent },
  { path: '404', component: Page404Component },
  { path: '', component: LoginComponent, pathMatch: 'full' }, // Raíz
  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
