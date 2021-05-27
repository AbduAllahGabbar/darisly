import { AllCoursesComponent } from './all-courses/all-courses.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CodeComponent } from './code/code.component';
import { PaymentComponent } from './payment/payment.component';
import { PackagesComponent } from './packages/packages.component';
import { SubjectComponent } from './subject/subject.component';
import { TrendingComponent } from './trending/trending.component';
import { PreviewsComponent } from './previews/previews.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { EducationSystemComponent } from './education-system/education-system.component';
import { GradeComponent } from './grade/grade.component';
import { AuthGuard } from './../Auth/auth.guard';
import { DeletedCoursesComponent } from './deleted-courses/deleted-courses.component';
import { AdminsComponent } from './admins/admins.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'teachers', component: TeacherComponent },
      { path: 'grades', component: GradeComponent },
      { path: 'educationSystems', component: EducationSystemComponent },
      { path: 'subjects', component: SubjectComponent },
      { path: 'promotions', component: PromotionsComponent },
      { path: 'payments', component: PaymentComponent },
      { path: 'codes', component: CodeComponent },
      { path: 'courses', component: AllCoursesComponent },
    ],
  },
];

export const COMPONENTS = [
  DashboardComponent,
  HomeComponent,
  TeacherComponent,
  CourseComponent,
  AdminsComponent,
  DeletedCoursesComponent,
  SideNavComponent,
  PromoCodeComponent,
  EducationSystemComponent,
  GradeComponent,
  GiftCardComponent,
  PreviewsComponent,
  TrendingComponent,
  SubjectComponent,
  PackagesComponent,
  PaymentComponent,
  CodeComponent,
  PromotionsComponent,
  AllCoursesComponent,
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutes {}
