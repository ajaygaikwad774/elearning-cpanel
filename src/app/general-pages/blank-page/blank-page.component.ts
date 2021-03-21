import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  feedback: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = "http://65.0.242.115:7001/elearning";

  constructor(private httpClient: HttpClient , private authenticationService: AuthenticationService , private router: Router) { 
   
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'feedback-list.xlsx');
   }

  ngOnInit() {
    this.httpClient.post<any[]>(this.baseUrl+"/feedback/getFeedbackListApi",{"email" : "ajaygaikwad@gmail.com" , "status" : "ACTIVE"})
    .subscribe(data => {
      this.feedback = (data as any).feedbackVo;
      console.log(this.feedback);
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
