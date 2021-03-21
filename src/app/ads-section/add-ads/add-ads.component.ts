import { AddformsService } from './../../addforms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { HttpEvent } from '@angular/common/http';

@Component({
    selector: 'app-add-ads',
    templateUrl: './add-ads.component.html',
    styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {

    success: boolean = false;
    successFile:boolean=false;
    uploadFile: any = "";
    imgUrl: any = "";
    base_imgUrl: any = "";
    form: FormGroup;
    result: any;
    progress: number = 0;

    constructor(private service: AddformsService, private authenticationService: AuthenticationService, private router: Router) {
        const currentUser = this.authenticationService.currentUserValue;
        if (!currentUser) {
            this.router.navigate(['/login']);
        }
        this.form = new FormGroup({
            email: new FormControl('ceo.elearning@gmail.com'),
            adsImage: new FormControl('', Validators.required),
            adsDescription: new FormControl('', Validators.required),
            });
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

    adsImgConvert(event) {
        this.selectedFiles = event.target.files;
        this.currentFile = this.selectedFiles.item(0);
        const fd = new FormData();
        fd.append('file', this.currentFile);

        // converted into bs4
        this.service.convertimg(fd).subscribe(res => {
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
                this.service.uploadtoAWS(this.imgConvert.value).subscribe((res: HttpEvent<any>) => {
                    this.imgUrl = res;
                    this.base_imgUrl = this.imgUrl.fileURL
                    console.log("aws link" , this.base_imgUrl);
                    //this.form.addControl('adsImage', new FormControl(this.base_imgUrl, Validators.required));
                    this.form.setValue({
                        email: 'ceo.elearning@gmail.com',
                        adsImage : this.base_imgUrl,
                        adsDescription: this.form.value.adsDescription
                    });
                    this.result = "Uploaded successfully";
                    this.successFile=true
                    if (this.base_imgUrl) {
                        this.progress = 100;
                    }
                })
            } else {
                this.result = "uploading fail"
                console.log(" uploading  fail");

            }

        });

        // end img upload to aws section 

    }


    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        console.log("Form value", this.form.value);
        this.service.uploadads(this.form.value).subscribe(result => {
            console.log(result);
            this.form.reset();
            this.success = true;
            this.progress = 0;
            this.successFile=false;
        });
        this.form.reset();
        (<HTMLInputElement>document.getElementById('addControl')).value = "";
    }

}
