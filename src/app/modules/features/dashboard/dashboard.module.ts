import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
