import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddformsService } from './../../addforms.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  private myForm: FormGroup;
  private categoriesCollection: any = [];
  private categoriesList: any = [];

  base64Convert:FormGroup;
  selectedFiles: FileList;
  currentFile: File;



  constructor(private fb: FormBuilder, private data: AddformsService, private service: CourseService) { }

  ngOnInit(): void {
    // get categories call api
    this.service.getcategory().subscribe(res => {
      this.categoriesCollection = res;
      this.categoriesList = this.categoriesCollection.category;
      console.log("categories List = ", this.categoriesList);
    })

    this.myForm = this.fb.group({
      email: new FormControl('ajaygaikwad@gmail.com', Validators.required),
      encMstCategoryId: new FormControl('', Validators.required),
      encMstSubCategoryId: new FormControl(''),
      courseTitle: new FormControl('', Validators.required),
      courseSubTitle: new FormControl('', Validators.required),
      courseDesc: new FormControl('', Validators.required),
      courseLanguage: new FormControl('', Validators.required),
      courseLevel: new FormControl('', Validators.required),
      amt: new FormControl(''),
      gstAmt: new FormControl(''),
      totalAmt: new FormControl(''),
      courseImages: this.fb.array([this.addCourseImages()]),
      courseVideos: this.fb.array([this.addCourseVideos()]),
      courseSection: this.fb.array([
        this.addSectionsArray()
      ])
    })

    this.base64Convert = new FormGroup({
      encodedString: new FormControl(''),
      fileName: new FormControl(''),
      fileSize: new FormControl(''),
      fileURL: new FormControl('')
    })

  }

  courseImages(): FormArray {
    return this.myForm.get("courseImages") as FormArray
  }

  courseVideos(): FormArray {
    return this.myForm.get("courseVideos") as FormArray
  }

  courseSection(): FormArray {
    return this.myForm.get("courseSection") as FormArray
  }

  courseSectionLecture(i: number): FormArray {
    return this.courseSection().at(i).get("courseSectionLecture") as FormArray
  }


  addCourseImages() {
    return this.fb.group({
      imageURL: ''
    })
  }

  addCourseVideos() {
    return this.fb.group({
      videoURL: ''
    })
  }

  //add course
  addCourseArray() {
    return this.fb.group({
      lectureNm: '',
      lectureDesc: '',
      pdfURL: '',
      videoURL: ''
    })
  }

  // add section logic

  addSectionsArray() {
    return this.fb.group({
      sectionNm: '',
      sectionDesc: '',
      courseSectionLecture: new FormArray([this.addCourseArray()])
    })

  }

  addCourseSection() {
    this.courseSection().push(this.addSectionsArray());
  }

  removeCourseSection(i: number) {
    if (i > 0) {
      this.courseSection().removeAt(i);
    }
  }

  addCourseSectionLecture(i: number) {
    this.courseSectionLecture(i).push(this.addCourseArray());
  }

  removeCourseSectionLecture(i: number, j: number) {
    if (j > 0) {
      this.courseSectionLecture(i).removeAt(j);
    }
  }

  uploadCourseImages(event) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    const fd = new FormData();
    fd.append('file', this.currentFile);

    // converted into bs4
    this.service.convertimg(fd).subscribe(res => {
      console.log('Img converted Result = ', res);
      let courseImg = res;
      // form group value for img upload to aws
      this.base64Convert = new FormGroup({
        encodedString: new FormControl(res['encodedString']),
        fileName: new FormControl(res['fileName']),
        fileSize: new FormControl(res['fileSize']),
        fileURL: new FormControl(res['fileURL'])
      })

      if (courseImg) {
        console.log("form value", this.base64Convert.value);
        //uploaded in to aws to get file link
        this.service.uploadtoAWS(this.base64Convert.value).subscribe(res => {
          console.log("aws img file url : ",(res as any).fileURL);
        })
      } else {
        console.log("else worke upload fail ");
      }

    });

  }
  
  saveCourses() {
    console.log(this.myForm.value);
  }


}
