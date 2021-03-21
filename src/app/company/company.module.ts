import { DataTablesModule } from 'angular-datatables';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { CompanyJobsComponent } from './company-jobs/company-jobs.component';

const routes: Routes = [
  {path:'view' , component: ViewComponent},
  {path: 'company-jobs/:id' , component: CompanyJobsComponent},
  //{path: 'company', redirectTo:"/view", pathMatch:"full"}
]



@NgModule({
  declarations: [ViewComponent, CompanyJobsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule { }
