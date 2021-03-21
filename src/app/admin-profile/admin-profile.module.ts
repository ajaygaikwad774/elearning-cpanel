import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { Routes , RouterModule } from '@angular/router'
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {path: 'add-profile' , component: AddProfileComponent}
]

@NgModule({
  declarations: [AddProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminProfileModule { }
