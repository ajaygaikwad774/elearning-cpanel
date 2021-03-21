import { Component, OnInit } from '@angular/core';
import { AddformsService } from '../../addforms.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-institude',
  templateUrl: './edit-institude.component.html',
  styleUrls: ['./edit-institude.component.scss']
})
export class EditInstitudeComponent implements OnInit {

  constructor(private service: AddformsService, private route: ActivatedRoute, private routes:Router) { }

  collection: any = [];
  instituteList: any;
  instituteResult: any
  success: boolean = false;


  form = new FormGroup({
    email: new FormControl('ceo.elearning@gmail.com'),
    instituteNm: new FormControl(''),
    courseNm: new FormControl(''),
    duration: new FormControl(''),
    instituteLocation: new FormControl(''),
    description: new FormControl('')
  })

  // push the data 

  requestData = new FormGroup({
    email: new FormControl('ajaygaikwad@gmail.com'),
    encMstInstituteId: new FormControl(this.route.snapshot.params.id)
  })


  ngOnInit(): void {

    console.log(" url Id =", this.route.snapshot.params.id);

    this.service.editUploads(this.requestData.value).subscribe(res => {

      console.log("data", res);
      this.instituteResult = res;
      this.instituteList = this.instituteResult.instituteVoList[0];
      console.log("instituteVoList", this.instituteList);


      this.form = new FormGroup({
        email: new FormControl('ceo.elearning@gmail.com'),
        encMstInstituteId: new FormControl(this.route.snapshot.params.id),
        instituteNm: new FormControl(this.instituteList.instituteNm),
        courseNm: new FormControl(this.instituteList.courseNm),
        duration: new FormControl(this.instituteList.duration),
        instituteLocation: new FormControl(this.instituteList.instituteLocation),
        description: new FormControl(this.instituteList.description)
      })




    })



  }



  updateinstitude1() {
    console.log("forms details",this.form.value);
    
    this.service.uploadinstitude(this.form.value).subscribe(res => {
      this.form.reset();
      this.success = true;
      console.log("data added", res);
      this.routes.navigateByUrl('/institude-section/view-institude')


    })
  }



}
