import { DataTablesModule } from 'angular-datatables';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
 
    {path:'add',component:AddPlanComponent},
    {path:'list',component:ViewPlanComponent}
]

@NgModule({
  declarations: [AddPlanComponent,ViewPlanComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class SubscriptionModule { }
