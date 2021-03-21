import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddformsService } from 'src/app/addforms.service';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  success : boolean = false;
  constructor(private data: AddformsService, private authenticationService: AuthenticationService, private router: Router) { 
    const currentUser = this.authenticationService.currentUserValue;
    if(!currentUser){
      this.router.navigate(['/login']);
    }
  }

  form = new FormGroup({
    email:new FormControl('ceo.elearning@gmail.com'),
    planName: new FormControl('' , Validators.required),
    planType: new FormControl('' , Validators.required),
    planDurationInMonth: new FormControl('' , Validators.required),
    planAmount: new FormControl('' , Validators.required),
    planDesc: new FormControl('')
    })

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.data.uploadplan(this.form.value).subscribe(()=> {
      this.success = true;
      this.form.reset();

    })
  }

}
