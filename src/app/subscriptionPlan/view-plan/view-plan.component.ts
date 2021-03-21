import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  plan: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = "http://65.0.242.115:7001/elearning/plan/getPlanListApi";
  
  constructor(private httpClient: HttpClient , private authenticationService: AuthenticationService , private router: Router) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
   }

   exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'view-subscription-plan-list.xlsx');
   }

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl,{email : "ajaygaikwad@gmail.com" , "status" : "ACTIVE"})
    .subscribe(data => {

      console.log("data of institute", data);
      
      this.plan = (data as any).planVosList;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
