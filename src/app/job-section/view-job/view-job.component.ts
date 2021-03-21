import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Router } from '@angular/router';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  jobs : any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = 'http://65.0.242.115:7001/elearning/jobs/getJobListAPI';

  constructor(private httpClient: HttpClient , private authenticationService: AuthenticationService, private router: Router) {
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
    xlsx.writeFile(wb, 'view-job-list.xlsx');
   }

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl,{email : 'ajaygaikwad@gmail.com' , 'status' : 'ACTIVE'})
    .subscribe(data => {
      this.jobs = (data as any).jobsVo;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
