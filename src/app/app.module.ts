/* framework core imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* third parties module imports */
import { ToastrModule } from 'ngx-toastr';

/* custom modules imports */
import { CoreModule } from 'core/core.module';

/* custom services imports */
import { TokenInterceptor } from 'core/services/interceptors/token.interceptor';

/* custom components imports */
import { AppComponent } from './app.component';
import { ConfigService } from 'core/services/config/config.service';
import { LoginComponent } from 'features/account/components/login/login.component';
import { UnAuthorizedComponent } from 'features/account/components/403/un-authorized/un-authorized.component';

/* a head of compile functions */
const initializerConfigFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [ConfigService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
