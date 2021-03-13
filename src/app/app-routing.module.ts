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
    loadChildren: () => import('./pages/new-customer/new-customer.module').then( m => m.NewCustomerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then( m => m.StatsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expenses',
    loadChildren: () => import('./pages/expenses/expenses.module').then( m => m.ExpensesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'route',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-detail/:id',
    loadChildren: () => import('./pages/customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-expense',
    loadChildren: () => import('./pages/new-expense/new-expense.module').then( m => m.NewExpensePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expense-detail',
    loadChildren: () => import('./pages/expense-detail/expense-detail.module').then( m => m.ExpenseDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sale-detail/:id/:name/:lastName/:phoneNumber',
    loadChildren: () => import('./pages/sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-sale',
    loadChildren: () => import('./pages/new-sale/new-sale.module').then( m => m.NewSalePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-sale',
    loadChildren: () => import('./pages/edit-sale/edit-sale.module').then( m => m.EditSalePageModule),
    canActivate: [AuthGuard]
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
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },{
    path: 'addtransactions',
    loadChildren: () => import('./pages/modals/addtransactions/addtransactions.module').then( m => m.AddtransactionsPageModule)
  },
  {
    path: 'successmodal',
    loadChildren: () => import('./pages/modals/successmodal/successmodal.module').then( m => m.SuccessmodalPageModule)
  },
  {
    path: 'reporte-prestamos',
    loadChildren: () => import('./pages/reporte-prestamos/reporte-prestamos.module').then( m => m.ReportePrestamosPageModule)
  },
  {
    path: 'reporte-prestamos-saldo-pendiente',
    loadChildren: () => import('./pages/reporte-prestamos-saldo-pendiente/reporte-prestamos-saldo-pendiente.module').then( m => m.ReportePrestamosSaldoPendientePageModule)
  },
  {
    path: 'reporte-gastos',
    loadChildren: () => import('./pages/reporte-gastos/reporte-gastos.module').then( m => m.ReporteGastosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
