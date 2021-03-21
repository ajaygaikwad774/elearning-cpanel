import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobComponent } from './view-job/view-job.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {path: 'view-job' , component: ViewJobComponent}
]


@NgModule({
  declarations: [ViewJobComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class JobSectionModule { }
