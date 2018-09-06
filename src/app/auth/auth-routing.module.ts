import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbLoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component:NbLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
