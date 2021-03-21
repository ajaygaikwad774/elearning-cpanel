import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewsComponent } from './add-news/add-news.component';
import { ViewNewsComponent } from './view-news/view-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {path: 'add-news' , component: AddNewsComponent} ,
  {path: 'view-news' , component: ViewNewsComponent}
]

@NgModule({
  declarations: [AddNewsComponent, ViewNewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsSectionModule { }
