import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { AddformsService } from './../../addforms.service'

@Component({
  selector: 'app-add-institude',
  templateUrl: './add-institude.component.html',
  styleUrls: ['./add-institude.component.scss']
})
export class AddInstitudeComponent implements OnInit {

  success : boolean = false;
  constructor(private data:AddformsService , private authenticationService: AuthenticationService , private router: Router) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
   }

  form = new FormGroup({
    email:new FormControl('ceo.elearning@gmail.com'),
    instituteNm: new FormControl('' , Validators.required),
    courseNm: new FormControl('' , Validators.required),
    duration: new FormControl('' , Validators.required),
    instituteLocation: new FormControl('' , Validators.required),
    description: new FormControl('')
    })

  ngOnInit(): void {
  }

  addinstitude1(){
    if (this.form.invalid) {
      return;
    }
    this.data.uploadinstitude(this.form.value).subscribe(()=> {
      this.form.reset();
      this.success = true;
    })
  }


}
