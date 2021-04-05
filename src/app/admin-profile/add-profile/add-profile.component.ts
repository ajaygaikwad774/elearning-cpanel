import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddformsService } from 'src/app/addforms.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  currentUser : any;
  success : boolean = false;
  admin : any = [];
  baseUrl: string = "http://65.0.242.115:7001/elearning/admin/getAdminListApi";

  form : FormGroup;

  constructor(private httpClient: HttpClient, private data: AddformsService , private authenticationService: AuthenticationService , private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
   this.form = new FormGroup({
    email: new FormControl('ceo.elearning@gmail.com'),
    title: new FormControl('' , Validators.required),
    firstNm: new FormControl('', Validators.required),
    lastNm: new FormControl('' , Validators.required),
    mobileNo: new FormControl('', Validators.required),
    age: new FormControl('' , Validators.required),
    dob: new FormControl(''),
    gender: new FormControl('', Validators.required),
    address: new FormGroup({
      encMstAddressId : new FormControl(''),
      addrNm: new FormControl('RESENDTIAL ADDRESS'),
      addrLn1: new FormControl(''),
      addrLn2: new FormControl(''),
      city:  new FormControl(''),
      state:new FormControl(''),
      country:new FormControl(''),
      pincode:new FormControl ('')
    })
  })
   }

   

  ngOnInit(): void {
    this.httpClient.post<any[]>(this.baseUrl,{email : "ajaygaikwad@gmail.com" , encMstAdminId : this.currentUser.encMstId ,"status" : "ACTIVE"})
    .subscribe(data => {
      this.admin = (data as any).adminVoList[0];
      console.log(this.admin);
      this.form = new FormGroup({
        email: new FormControl('ceo.elearning@gmail.com'),
        encMstAdminId : new FormControl(this.currentUser.encMstId, Validators.required),
        encMstUsrId : new FormControl(this.currentUser.encMstUsrId, Validators.required),
        title: new FormControl(this.admin.title , Validators.required),
        firstNm: new FormControl(this.admin.firstNm , Validators.required),
        lastNm: new FormControl(this.admin.lastNm , Validators.required),
        mobileNo: new FormControl(this.admin.user.mobileNo, Validators.required),
        age: new FormControl(this.admin.age , Validators.required),
        gender: new FormControl(this.admin.gender , Validators.required),
        address: new FormGroup({
          encMstAddressId : new FormControl(this.admin.address.encMstAddressId),
          addrNm: new FormControl('RESENDTIAL ADDRESS'),
          addrLn1: new FormControl(this.admin.address.addrLn1),
          addrLn2: new FormControl(this.admin.address.addrLn2),
          city:  new FormControl(this.admin.address.city),
          state:new FormControl(this.admin.address.state),
          country:new FormControl(this.admin.address.country),
          pincode:new FormControl (this.admin.address.pincode)
        })
      })
  
    });

  }

  addProfile(){
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.data.uploadaddprofile(this.form.value).subscribe(result=> {
      this.success = true;
      console.log(result);
    })
  }

}