import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/login/authentication.service';
import 'rxjs/add/operator/map';
import { AddformsService } from '../../addforms.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-view-institude',
  templateUrl: './view-institude.component.html',
  styleUrls: ['./view-institude.component.scss']
})
export class ViewInstitudeComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  institutes: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  isDtInitialized: boolean = false;

  baseUrl: string = "http://65.0.242.115:7001/elearning";

  constructor(private service: AddformsService, private httpClient: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
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
    xlsx.writeFile(wb, 'institute-details-list.xlsx');
   }

  ngOnInit(): void {
    this.institutes = [];
    this.httpClient.post<any[]>(this.baseUrl + "/institute/getInstituteListAPI", { email: "ajaygaikwad@gmail.com", "status": "ACTIVE" })
      .subscribe(data => {
        console.log("data of institute", data);
        this.institutes = (data as any).instituteVoList;
        if (this.isDtInitialized) {
            this.dtTrigger.next();         
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      });
  }


  delete(encMstInstituteId: any) {

    if (confirm("Are you sure to delete.")) {
      this.deleteData(encMstInstituteId);
      this.institutes = [];
      this.ngOnInit();
    }
  }

  deleteRequest: any = {
    type: '',
    encMstId: '',
    status: ''
  }


  deleteData(id: any) {
    console.log("delete data", id);
    this.deleteRequest = {
      type: 'MST_INSTITUTE',
      encMstId: id,
      status: 'INACTIVE'
    }

    console.log("delete request response", this.deleteRequest);


    this.service.delete(this.deleteRequest).subscribe(res => {
      console.log("delete request response", this.deleteRequest);
      console.log("delete result", res);
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
