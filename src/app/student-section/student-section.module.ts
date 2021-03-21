import { DataTablesModule } from 'angular-datatables';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: 'student-details' , component: StudentDetailsComponent},
  {path: 'student-details/:id' , component: ViewComponent}
]

@NgModule({
  declarations: [StudentDetailsComponent, ViewComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentSectionModule { }
