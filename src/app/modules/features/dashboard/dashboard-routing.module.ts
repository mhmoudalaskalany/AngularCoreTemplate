import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from 'features/home/home.component';
import { UnAuthorizedComponent } from 'features/account/components/403/un-authorized/un-authorized.component';
import { AuthGuard } from 'core/services/guards/authguard.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        // data: { permission: 'allowAll' }
      },
      {
        path: '403',
        component: UnAuthorizedComponent
      },
      {
        path: 'permission',
        loadChildren: () => import('../permission/permission.module').then(m => m.PermissionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
