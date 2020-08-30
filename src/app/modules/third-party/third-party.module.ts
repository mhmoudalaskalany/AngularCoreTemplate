import { PrimeModule } from './primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModules } from './ngx-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapModules,
    PrimeModule,
    NgSelectModule
  ],
  exports: [NgxBootstrapModules, PrimeModule, NgSelectModule]
})
export class ThirdPartyModule { }
