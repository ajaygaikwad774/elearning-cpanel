import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/login/authentication.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddformsService } from 'src/app/addforms.service';
import { DataTableDirective } from 'angular-datatables';
import * as xlsx from 'xlsx';
import * as moment from "moment";

@Component({
  selector: 'app-view-ads',
  templateUrl: './view-ads.component.html',
  styleUrls: ['./view-ads.component.scss']
})
export class ViewAdsComponent implements OnInit, OnDestroy {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  ads: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  isDtInitialized: boolean = false;

  baseUrl: string = "http://65.0.242.115:7001/elearning";

  constructor(private service: AddformsService , private httpClient: HttpClient, private authenticationService: AuthenticationService , private router: Router) {
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
    xlsx.writeFile(wb, 'view-advertise-list.xlsx');
   }

  ngOnInit(): void {
    this.ads = [];
    this.httpClient.post<any[]>(this.baseUrl+"/ads/getAdsListAPI", { "email": "ceo.elearning@gmail.com", "status": "ACTIVE" })
      .subscribe(data => {
        console.log("data of ads" , data);
        this.ads = (data as any).adsVoList;
        if (this.isDtInitialized) {
          this.dtTrigger.next();         
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
        // console.log("list api data",this.ads);    
        // this.dtTrigger.next();
      });
  }

  delete(encMstAdsId : any){
    if (confirm("Are you sure to delete.")) {
      this.deleteData(encMstAdsId);
      this.ads = [];
      this.ngOnInit();
    }
  }

  deleteRequest: any = {
    type: '',
    encMstId: '',
    status: ''
  }

  deleteData(id: any){
    console.log("delete" , id);
    this.deleteRequest = {
      type: 'MST_ADS',
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

  ago(time) {
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();

  }


}
