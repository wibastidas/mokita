import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from '../guards/auto-login.guard';
import { IntroGuard } from '../guards/intro.guard';
import { IndexPage } from './index.page';

const routes: Routes = [
    {
    path: '',
    component: IndexPage,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('../pages/auth/login/login.module').then(m => m.LoginPageModule),
        canActivate: [IntroGuard, AutoLoginGuard] 
      },
      {
        path: 'intro',
        loadChildren: () =>
        import('../pages/intro/intro.module').then(m => m.IntroPageModule),
      },
      {
        path: 'login',
        loadChildren: () =>
        import('../pages/auth/login/login.module').then(m => m.LoginPageModule),
        canActivate: [IntroGuard, AutoLoginGuard] 
        //canActivate: [AutoLoginGuard]
      },
      {
        path: 'register',
        loadChildren: () =>
        import('../pages/auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../pages/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      }
    ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
