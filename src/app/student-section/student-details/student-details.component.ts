import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject  } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Router } from '@angular/router';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit,OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  students: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = 'http://65.0.242.115:7001/elearning/student/getStudentProfileDtls'

  constructor(private httpClient:HttpClient , private authenticationService: AuthenticationService , private router: Router) {
    const currentUser = this.authenticationService.currentUserValue;
    if(!currentUser){
      this.router.navigate(['/login']);
    }
   }

   exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'view-student-details-list.xlsx');
   }

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl,{email : 'ajaygaikwad@gmail.com' , 'status' : 'ACTIVE'})
    .subscribe(data => {
      console.log("student Details",data);
      
      this.students = (data as any).studentVo;
      this.dtTrigger.next();
    });
  }

  viewStudent(id : string)
  {
    console.log(id);
    this.router.navigate(['/','student-section','student-details',id]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
