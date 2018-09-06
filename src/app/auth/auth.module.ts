import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NbLoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbAuthModule
  ],
  declarations: [NbLoginComponent]
})
export class AuthModule { }
