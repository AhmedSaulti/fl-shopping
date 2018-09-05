import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { MyListComponent } from './my-list/my-list.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    ThemeModule
  ],
  declarations: [MyListComponent]
})
export class ShoppingListModule { }
