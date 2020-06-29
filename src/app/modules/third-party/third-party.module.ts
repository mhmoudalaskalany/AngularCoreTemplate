import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModules } from './ngx-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { PrimeNgModules } from './primeng';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapModules,
    PrimeNgModules,
    NgSelectModule
  ],
  exports: [NgxBootstrapModules, PrimeNgModules, NgSelectModule]
})
export class ThirdPartyModule { }
