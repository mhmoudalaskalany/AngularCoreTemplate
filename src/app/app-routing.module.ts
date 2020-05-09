import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/features/account/components/login/login.component';
import { UnAuthorizedComponent } from 'features/account/components/403/un-authorized/un-authorized.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '403',
    component: UnAuthorizedComponent
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/features/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
