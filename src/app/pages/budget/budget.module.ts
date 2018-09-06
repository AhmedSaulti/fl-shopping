import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductsService } from '../../services/products/products.service';
import { ListItemsService } from '../../services/list-items/list-items.service';

@NgModule({
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ThemeModule
  ],
  declarations: [BudgetComponent],
  providers:[ProductsService,ListItemsService]
})
export class BudgetModule { }
