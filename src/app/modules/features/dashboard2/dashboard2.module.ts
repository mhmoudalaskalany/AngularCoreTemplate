import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard2RoutingModule } from './dashboard2-routing.module';
import { Layout2Component } from './components/layout/layout2.component';
import { Navbar2Component } from './components/navbar/navbar2.component';
import { Footer2Component } from './components/footer/footer2.component';
import { Sidebar2Component } from './components/sidebar/sidebar2.component';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    Layout2Component,
    Navbar2Component,
    Sidebar2Component,
    Footer2Component
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CollapseModule.forRoot(),
    Dashboard2RoutingModule
  ],
  exports: [Navbar2Component]
})
export class Dashboard2Module { }
