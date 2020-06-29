import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPermissionComponent } from './components/all-permission/all-permission.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';
import { AuthGuard } from 'core/services/guards/authguard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: AllPermissionComponent,
    // canActivate : [AuthGuard],
    // data: { permission: 'allowAll' }
  },
  {
    path: 'add',
    component: AddPermissionComponent,
    // canActivate : [AuthGuard],
    // data: { permission: 'allowAll' }
  },
  {
    path: ':id',
    component: AddPermissionComponent,
    // canActivate : [AuthGuard],
    // data: { permission: 'allowAll' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
