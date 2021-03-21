import { DataTablesModule } from 'angular-datatables';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { ViewAdsComponent } from './view-ads/view-ads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'add-ads' , component: AddAdsComponent},
  {path: 'view-ads' , component: ViewAdsComponent}
]

@NgModule({
  declarations: [AddAdsComponent, ViewAdsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class AdsSectionModule { }
