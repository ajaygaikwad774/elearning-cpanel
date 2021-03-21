import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Router } from '@angular/router';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  companys: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = "http://65.0.242.115:7001/elearning/company/getCompanyProfileDtls";

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
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
    xlsx.writeFile(wb, 'company-details-list.xlsx');
   }

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl, { email: "ajaygaikwad@gmail.com", "status": "ACTIVE" })
      .subscribe(data => {
        this.companys = (data as any).company;
        this.dtTrigger.next();
        console.log("company list",data);
        

      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
