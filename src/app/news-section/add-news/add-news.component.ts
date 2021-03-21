import { AddformsService } from './../../addforms.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  success: boolean = false;
  successFile: boolean = false;
  uploadFile: any = "";
  imgUrl: any = "";
  base_imgUrl: any = "";
  form: FormGroup;
  result: any;
  progress: number = 0;
  constructor(private data: AddformsService, private authenticationService: AuthenticationService, private router: Router) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    }

    this.form = new FormGroup({
      email: new FormControl('ceo.elearning@gmail.com'),
      feedsTitle: new FormControl('', Validators.required),
      feedsSubject: new FormControl('', Validators.required),
      feedsDescription: new FormControl('', Validators.required),
      feedsImage: new FormControl('')
    })
  }


  ngOnInit(): void {
  }

  // to sent data to aws upload img

  imgConvert = new FormGroup({

    encodedString: new FormControl(''),
    fileName: new FormControl(''),
    fileSize: new FormControl(''),
    fileURL: new FormControl('')

  })

  // get file code
  selectedFiles: FileList;
  currentFile: File;
  data1: any = [];

  //Image converter


  feedsImgConvert(event) {
    this.progress = 10;
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    const fd = new FormData();
    fd.append('file', this.currentFile);

    // converted into bs4
    this.data.convertimg(fd).subscribe(res => {
      console.log('Img converted Result = ', res);
      this.uploadFile = res
      // form group value for img upload to aws
      this.imgConvert = new FormGroup({
        encodedString: new FormControl(res['encodedString']),
        fileName: new FormControl(res['fileName']),
        fileSize: new FormControl(res['fileSize']),
        fileURL: new FormControl(res['fileURL'])
      })

      for (let i = 0; i < 60; i++) {
        this.progress = i;
      }

      if (this.uploadFile = true) {


        console.log("form value", this.imgConvert.value);

        //uploaded in to aws to get file link
        this.data.uploadtoAWS(this.imgConvert.value).subscribe((res: HttpEvent<any>) => {
          this.imgUrl = res;
          this.base_imgUrl = this.imgUrl.fileURL
          console.log("aws link", this.base_imgUrl);
          //this.form.addControl('feedsImage', new FormControl(this.base_imgUrl, Validators.required));
          this.form.setValue({
            email: 'ceo.elearning@gmail.com',
            feedsTitle: this.form.value.feedsTitle,
            feedsDescription: this.form.value.feedsDescription,
            feedsSubject: this.form.value.feedsSubject,
            feedsImage: this.base_imgUrl
          });
          this.result = "Uploaded successfully";
          this.successFile = true
          if (this.base_imgUrl) {
            this.progress = 100;
          }
        })
      } else {

        this.result = "uploading Fail "
        console.log(" uploading  fail ");

      }

    });

    // end img upload to aws section 

  }

  addnews1() {
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
    console.log("Form value", this.form.value);
    this.data.uploadnews(this.form.value).subscribe(result => {
      console.log(result);
      this.success = true;
      this.progress = 0;
      this.successFile = false;
    })
    this.form.reset();
    (<HTMLInputElement>document.getElementById('feedsimg')).value = "";


  }
}
