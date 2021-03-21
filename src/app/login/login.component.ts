import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  error  : boolean = false;
  message : string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      type: 'ADMIN',
    });

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  login() {
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    }

    let emailId  = this.loginForm.controls.emailId.value;
    let pwd = this.loginForm.controls.pwd.value;
    let type = this.loginForm.controls.type.value;

    this.authenticationService.login(emailId,pwd,type)
            .pipe(first())
            .subscribe(
                () => {
                  this.router.navigate(['/dashboard']);
                },
                err => {
                  this.message = err.error.message;
                  this.error = true;
                  this.loading = false;
                });
    }


  get emailId() {
    return this.loginForm.get('emailId');
  }
  get pwd() {
    return this.loginForm.get('pwd');
  }
}
