import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'core/services/guards/authguard.guard';
import { LoginComponent } from 'features/account/components/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/features/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard],
    // data: { permission: 'allowAll' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
