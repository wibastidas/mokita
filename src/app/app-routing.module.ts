import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
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
  },
  {
    path: 'sale-detail/:id',
    loadChildren: () => import('./pages/sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule)
  },
  {
    path: 'new-sale',
    loadChildren: () => import('./pages/new-sale/new-sale.module').then( m => m.NewSalePageModule)
  },
  {
    path: 'edit-sale',
    loadChildren: () => import('./pages/edit-sale/edit-sale.module').then( m => m.EditSalePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: '**', redirectTo: '/login', pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
