import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddformsService } from 'src/app/addforms.service';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  
  currentUser:any;
  studentList : any = [];
  constructor(private route: ActivatedRoute,private data: AddformsService , private authenticationService: AuthenticationService , private router: Router) { 
    this.currentUser = this.authenticationService.currentUserValue;
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }

  form = new FormGroup({
    title: new FormControl(''),
    fName: new FormControl(''),
    mName: new FormControl(''),
    lName: new FormControl(''),
    mail: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    education: new FormControl(''),
    mNumber: new FormControl(''),
    address: new FormControl('')
  })


  // push the data 

  requestData = new FormGroup({
    email: new FormControl('ajaygaikwad@gmail.com'),
    encMstStudentId: new FormControl(this.route.snapshot.params.id),
    status : new FormControl('ACTIVE')
  })

  ngOnInit(): void {
    this.data.getStudentById(this.requestData.value).subscribe(res => {
      this.studentList = (res as any).studentVo[0];
      console.log(this.studentList);
      console.log(this.studentList.title);
    })
}

}
