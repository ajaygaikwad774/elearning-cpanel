import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddformsService } from 'src/app/addforms.service';
import { DataTableDirective } from 'angular-datatables';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  feeds: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  isDtInitialized: boolean = false;

  baseUrl: string = 'http://65.0.242.115:7001/elearning/feed/getFeedsListAPI';

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
    xlsx.writeFile(wb, 'view-news-list.xlsx');
   }

  ngOnInit(): void {
    this.feeds = [];
    this.httpClient.post<any[]>(this.baseUrl, { email: 'ajaygaikwad@gmail.com', 'status': 'ACTIVE' })
      .subscribe(data => {
        console.log("data of feeds", data);
        this.feeds = (data as any).feedsList
        if (this.isDtInitialized) {
          this.dtTrigger.next();
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      });
  }

  delete(encMstFeedsId: any) {

    if (confirm("Are you sure to delete.")) {
      this.deleteData(encMstFeedsId);
      this.feeds = [];
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
      type: 'MST_FEEDS',
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
