
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    TableModule,
    CheckboxModule,
    SidebarModule
  ],
  exports: [
    TableModule,
    CheckboxModule,
    SidebarModule
  ]
})
export class PrimeModule { }
