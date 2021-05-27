import { PathResolveService } from './not-found/path-resolve.service';
import { AdminService } from './admin.service';
import { DashboardModule } from './Dashboard/dashboard.module';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, IndexComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [AdminService, PathResolveService],
  bootstrap: [AppComponent],
})
export class AppModule {}
