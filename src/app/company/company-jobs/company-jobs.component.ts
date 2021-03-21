import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import {AddformsService} from "../../addforms.service";
import { Subject } from 'rxjs';
import { ComponentFixture , TestBed } from "@angular/core/testing";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  jobData:any=[];
  jobVO:any=[];
  constructor(private route:ActivatedRoute, private service:AddformsService) { }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'company-jobs-list.xlsx');
   }

  requestData = new FormGroup({
    email: new FormControl('ceo.elearning@gmail.com'),
    encMstCompanyId: new FormControl(this.route.snapshot.params.id)// or use this.route.snapshot.params.id
  })


  ngOnInit(): void {
    console.log("url id value", this.route.snapshot.params.id);
    this.service.getCompanyJobList(this.requestData.value).subscribe(res=>{
      this.dtTrigger.next();
      console.log('hello',res);
      this.jobData=res;
      this.jobVO=this.jobData.jobsVo;
      console.log("jobVO list" , this.jobVO);
    })  
  }

}
