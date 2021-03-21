import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {Subject} from 'rxjs';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  institutes: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = "http://65.0.242.115:7001/elearning/institute/getAppliedInstituteListAPI";

  constructor(private httpClient: HttpClient, private route:ActivatedRoute,private routes:Router) { }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'applied-student-list.xlsx');
   }

  data = new FormGroup({
    email: new FormControl('institute1@gmail.com'),
    encMstInstituteId : new FormControl(this.route.snapshot.params.id)
  })

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl, { "encMstInstituteId": this.route.snapshot.params.id, "email":"xyz@gmail.com", "status" : "PENDING"  })
    .subscribe(data =>{
      console.log("institute list",data);
      this.institutes = (data as any).instituteApplied;
      this.dtTrigger.next();
     }) 
  }
  

}
