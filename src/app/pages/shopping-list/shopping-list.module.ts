import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { MyListComponent } from './my-list/my-list.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ListItemsService } from '../../services/list-items/list-items.service';
import { ProductsService } from '../../services/products/products.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    ThemeModule
  ],
  declarations: [MyListComponent],
  providers:[ListItemsService, ProductsService]
})
export class ShoppingListModule { }
