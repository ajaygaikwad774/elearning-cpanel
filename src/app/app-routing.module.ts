import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './error-pages/error404/error404.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard' , component: DashboardComponent , canActivate: [AuthGuard],},
  { path: 'login', component: LoginComponent },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  // { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },

  { path: 'admin-profile' , loadChildren: () => import('./admin-profile/admin-profile.module').then(m => m.AdminProfileModule) },
  { path: 'course-section' , loadChildren: () => import('./course-section/course-section.module').then(m => m.CourseSectionModule) },
  { path: 'news-section' , loadChildren: () => import('./news-section/news-section.module').then(m => m.NewsSectionModule) },
  { path: 'student-section' , loadChildren: () => import('./student-section/student-section.module').then(m => m.StudentSectionModule) },
  { path: 'institude-section' , loadChildren: () => import('./institude-section/institude-section.module').then(m => m.InstitudeSectionModule) },
  { path: 'story-section' , loadChildren: () => import('./story-section/story-section.module').then(m => m.StorySectionModule) },
  { path: 'ads-section' , loadChildren: () => import('./ads-section/ads-section.module').then(m => m.AdsSectionModule) },
  { path: 'job-section' , loadChildren: () => import('./job-section/job-section.module').then(m => m.JobSectionModule) },
  { path: 'company' , loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  { path: 'plan' , loadChildren: () => import('./subscriptionPlan/subscriptionPlan.module').then(m => m.SubscriptionModule)},
  { path: 'change' , loadChildren: () => import('./change/change.module').then(m => m.ChangeModule)},
  { path : '**' , component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
