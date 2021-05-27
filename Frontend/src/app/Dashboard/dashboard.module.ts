import { ErrorInterceptor } from './../Auth/error.interceptor';
import { JwtInterceptor } from './../Auth/jwt.interceptor';
import { DashboardComponent } from './dashboard.component';
import { SERVICES } from './services';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  LocationStrategy,
  PathLocationStrategy,
  CommonModule,
} from '@angular/common';
import { DashboardRoutes, COMPONENTS } from './dashboard.routes';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutes,
    HttpClientModule,
    NgxSpinnerModule,
    NgSelectModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
