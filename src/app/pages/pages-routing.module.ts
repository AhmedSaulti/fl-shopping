import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
      // {
      //   path: 'products',
      //   loadChildren: './products/products.module#ProductsModule'
      // },
      {
        path: 'shopping-list',
        loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
      },
      // {
      //   path: 'budget',
      //   loadChildren: './budget/budget.module#BudgetModule'
      // },
      {
        path: '',
        redirectTo: 'shopping-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
