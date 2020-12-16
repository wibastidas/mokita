import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'new-customer',
    loadChildren: () => import('./pages/new-customer/new-customer.module').then( m => m.NewCustomerPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then( m => m.StatsPageModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./pages/expenses/expenses.module').then( m => m.ExpensesPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule)
  },
  {
    path: 'customer-detail/:id',
    loadChildren: () => import('./pages/customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  },
  {
    path: 'new-expense',
    loadChildren: () => import('./pages/new-expense/new-expense.module').then( m => m.NewExpensePageModule)
  },
  {
    path: 'expense-detail',
    loadChildren: () => import('./pages/expense-detail/expense-detail.module').then( m => m.ExpenseDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
