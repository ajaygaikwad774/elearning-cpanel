import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {

    // const currentUser = this.authenticationService.currentUserValue;
    // if (!currentUser) {
    //   this.router.navigate(['/login']);
    // }

  }

  ngOnInit(): void {
  }

}
