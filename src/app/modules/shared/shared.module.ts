import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ThirdPartyModule } from 'third-party/third-party.module';



@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    ThirdPartyModule
  ],
  exports: [LoadingSpinnerComponent , ThirdPartyModule]
})
export class SharedModule { }
