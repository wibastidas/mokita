import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/route/route.module').then( m => m.RoutePageModule),
      },
      {
        path: 'new-customer',
        loadChildren: () => import('../pages/new-customer/new-customer.module').then( m => m.NewCustomerPageModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('../pages/customers/customers.module').then( m => m.CustomersPageModule),
      },
      {
        path: 'stats',
        loadChildren: () => import('../pages/stats/stats.module').then( m => m.StatsPageModule),
      },
      {
        path: 'expenses',
        loadChildren: () => import('../pages/expenses/expenses.module').then( m => m.ExpensesPageModule),
      },
      {
        path: 'route',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/route/route.module').then( m => m.RoutePageModule),
          },
          {
            path: 'route/sale-detail/:id/:name/:lastName/:phoneNumber',
            loadChildren: () => import('../pages/sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule),
          }
        ]
      },
      {
        path: 'customer-detail/:id',
        loadChildren: () => import('../pages/customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule),
      },
      {
        path: 'new-expense',
        loadChildren: () => import('../pages/new-expense/new-expense.module').then( m => m.NewExpensePageModule),
      },
      {
        path: 'expense-detail',
        loadChildren: () => import('../pages/expense-detail/expense-detail.module').then( m => m.ExpenseDetailPageModule),
      },
      {
        path: 'new-sale',
        loadChildren: () => import('../pages/new-sale/new-sale.module').then( m => m.NewSalePageModule),
      },
      {
        path: 'edit-sale',
        loadChildren: () => import('../pages/edit-sale/edit-sale.module').then( m => m.EditSalePageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule),
      },{
        path: 'addtransactions',
        loadChildren: () => import('../pages/modals/addtransactions/addtransactions.module').then( m => m.AddtransactionsPageModule)
      },
      {
        path: 'successmodal',
        loadChildren: () => import('../pages/modals/successmodal/successmodal.module').then( m => m.SuccessmodalPageModule)
      },
      {
        path: 'reporte-prestamos',
        loadChildren: () => import('../pages/reporte-prestamos/reporte-prestamos.module').then( m => m.ReportePrestamosPageModule)
      },
      {
        path: 'reporte-prestamos-saldo-pendiente',
        loadChildren: () => import('../pages/reporte-prestamos-saldo-pendiente/reporte-prestamos-saldo-pendiente.module').then( m => m.ReportePrestamosSaldoPendientePageModule)
      },
      {
        path: 'reporte-gastos',
        loadChildren: () => import('../pages/reporte-gastos/reporte-gastos.module').then( m => m.ReporteGastosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
