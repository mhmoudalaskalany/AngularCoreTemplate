import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModules } from './ngx-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapModules
  ],
  exports: [NgxBootstrapModules]
})
export class ThirdPartyModule { }
