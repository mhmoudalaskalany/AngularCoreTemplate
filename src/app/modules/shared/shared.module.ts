import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ThirdPartyModule } from 'third-party/third-party.module';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    ThirdPartyModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [LoadingSpinnerComponent, ThirdPartyModule, TranslateModule]
})
export class SharedModule { }
