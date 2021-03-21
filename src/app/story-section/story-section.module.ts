import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { Routes , RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStoryComponent } from './add-story/add-story.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'add-story' , component: AddStoryComponent},
  {path: 'view-story' , component: ViewStoryComponent}
]



@NgModule({
  declarations: [AddStoryComponent, ViewStoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class StorySectionModule { }
