import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  baseUrl: string = "http://65.0.242.115:7001/elearning/";
  dashboard : any;

  constructor(private httpClient: HttpClient,private authenticationService: AuthenticationService, private router: Router) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.httpClient.post<any[]>(this.baseUrl+"/dashbaord/getAdminDashboardData",{email : "ajaygaikwad@gmail.com"})
    .subscribe(data => {
      this.dashboard = data;
      console.log(this.dashboard);
    });
  }

  /* Fetch Admin Dashobard Count */

  getAdminDashboardData() {

  }

  /* Fetch Admin Dashobard Count */
  }
