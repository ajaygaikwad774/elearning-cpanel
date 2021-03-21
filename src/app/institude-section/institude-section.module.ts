import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitudeComponent } from './add-institude/add-institude.component';
import { ViewInstitudeComponent } from './view-institude/view-institude.component';
import { Routes, RouterModule } from '@angular/router';
import { EditInstitudeComponent } from './edit-institude/edit-institude.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'add-institude', component: AddInstitudeComponent },
  { path: 'view-institude', component: ViewInstitudeComponent },
  { path: 'edit-institude/:id', component: EditInstitudeComponent },
  { path: 'view/:id', component: ViewComponent }
]

@NgModule({
  declarations: [AddInstitudeComponent, ViewInstitudeComponent, EditInstitudeComponent, ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class InstitudeSectionModule { }
