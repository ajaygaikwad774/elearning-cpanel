import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddformsService } from 'src/app/addforms.service';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  success: boolean;
  currentUser: any = [];
  baseUrl: string = "http://65.0.242.115:7001/elearning/admin/getAdminListApi";
  user: any = [];
  error: boolean;
  message: any = "";

  form = new FormGroup({
    encMstUsrId: new FormControl(this.user.encMstUsrId, Validators.required),
    oldPwd: new FormControl('', Validators.required),
    newPwd: new FormControl('', Validators.required),
    cpwd: new FormControl('',Validators.required),
    type: new FormControl('ADMIN', Validators.required)
  }, { validators: this.checkPasswords })

  constructor(private httpClient: HttpClient, private service: AddformsService, private authenticationService: AuthenticationService, private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

  }


  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl, { email: "ajaygaikwad@gmail.com", encMstAdminId: this.currentUser.encMstId, "status": "ACTIVE" })
      .subscribe(data => {
        this.user = (data as any).adminVoList[0].user;
        this.form = new FormGroup({
          encMstUsrId: new FormControl(this.currentUser.encMstUsrId, Validators.required),
          oldPwd: new FormControl('', Validators.required),
          newPwd: new FormControl('', Validators.required),
          cpwd: new FormControl('',Validators.required),
          type: new FormControl('ADMIN', Validators.required)
        }, { validators: this.checkPasswords })
      });
  }



  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log("check form value", this.form.value);
    this.service.changePassword(this.form.value).subscribe(() => {
      this.success = true;
      this.form.reset();
      this.message = "Updated Password Successfully"
      setTimeout(() => {

        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      this.error = true;
      this.message = error.error.message;
    })
  }

  onConfirmMethod() {
    console.log("OnBlured");
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('newPwd').value;
    const confirmPassword = group.get('cpwd').value;
    if (password !== confirmPassword) {
      group.controls.cpwd.setErrors({ mismatch: true });
    }
    return password === confirmPassword ? null : { setName: true }
  }
}
