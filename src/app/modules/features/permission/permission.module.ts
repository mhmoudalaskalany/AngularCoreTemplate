import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';
import { AllPermissionComponent } from './components/all-permission/all-permission.component';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [AddPermissionComponent, AllPermissionComponent],
  imports: [
    CommonModule,
    SharedModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }
