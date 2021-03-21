import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject  } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  courses: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  baseUrl: string = "http://65.0.242.115:7001/elearning/course/getCouseDtlsById";

  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl,{email : "ajaygaikwad@gmail.com" , "status" : "ACTIVE"})
    .subscribe(data => {
      this.courses = (data as any).course;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
