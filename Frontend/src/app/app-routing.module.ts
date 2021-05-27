import { NotFoundComponent } from './not-found/not-found.component';
import { PathResolveService } from './not-found/path-resolve.service';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./Dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    resolve: { path: PathResolveService },
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
