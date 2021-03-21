import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course/add-course.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {path: 'add-course' , component: AddCourseComponent} ,
  {path: 'view-course' , component: ViewCourseComponent}
]

@NgModule({
  declarations: [AddCourseComponent, ViewCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forChild(routes),
  ]
})
export class CourseSectionModule { }
