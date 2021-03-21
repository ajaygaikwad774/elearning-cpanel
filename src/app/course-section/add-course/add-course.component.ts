import { Component, OnInit ,Renderer2,ElementRef,ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddformsService } from './../../addforms.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  // all variable declare here only
  // for storing categoris data
  categoriesCollection: any = [];
  categoriesList: any = [];
  // converted file storing result aws link
  uploadFile:any="";
  uploadShorVideo:any="";
  imgUrl:any="";
  videoUrl:any="";

  // course section 
  public courses: any[] = [{
    id: 1,
    name: '',
    course: ''
  }];

  public section:any[]=[{
    id:1,
    name:'',
  }]

  constructor(private data: AddformsService, private service: CourseService , private renderer:Renderer2) { }


  // for caourse add
  addcourse = new FormGroup({
    email: new FormControl('ceo.elearning@gmail.com'),
    courseTitle: new FormControl(''),
    courseSubTitle: new FormControl(''),
    courseDesc: new FormControl(''),
    courseLanguage: new FormControl(''),
    courseLevel: new FormControl(''),
    courseImages: new FormControl(''),
    courseVideos: new FormControl('')
  })

  // to sent data to aws upload img

  imgConvert = new FormGroup({

    encodedString: new FormControl(''),
    fileName: new FormControl(''),
    fileSize:new FormControl(''),
    fileURL:new FormControl('')

  })

  // to sent data to aws to upload short videos

  VideoConvert = new FormGroup({

    encodedString: new FormControl(''),
    fileName: new FormControl(''),
    fileSize:new FormControl(''),
    fileURL:new FormControl('')

  })

  // get file code

  selectedFiles: FileList;
  currentFile: File;
  data1: any = [];

  // get file on change for imgaes
   uploadImg(event) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    const fd = new FormData();
    fd.append('file', this.currentFile);

    // converted into bs4
    this.service.convertimg(fd).subscribe(res => {
      console.log('Img converted Result = ', res);
      this.uploadFile=res
      // form group value for img upload to aws
      this.imgConvert = new FormGroup({
        encodedString: new FormControl(res['encodedString']),
        fileName: new FormControl(res['fileName']),
        fileSize:new FormControl(res['fileSize']),
        fileURL:new FormControl(res['fileURL'])
      })

      if(this.uploadFile=true)
      {
  
        console.log("form value" ,this.imgConvert.value);
        
           //uploaded in to aws to get file link
      this.service.uploadtoAWS(this.imgConvert.value).subscribe(res => {
        console.log("result on the way");
        console.log("aws img link =", res);
  
        this.imgUrl=res;
        console.log("aws img file url : ",this.imgUrl.fileURL);
  
      })
      }else{
        console.log("else worke upload fail ");
        
      }

    });

   // end img upload to aws section 


   



  }

  // get file on chage for shorts videos

 async uploadVideo(event) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    const fd = new FormData();
    fd.append('file', this.currentFile);

    // converted into bs4
    this.service.convertimg(fd).subscribe(res => {
      console.log('Video converted Result = ', res);
      this.uploadShorVideo=res;

      // form group value
      this.VideoConvert = new FormGroup({
        encodedString: new FormControl(res['encodedString']),
        fileName: new FormControl(res['fileName']),
        fileSize:new FormControl(res['fileSize']),
        fileURL:new FormControl(res['fileURL'])
      })

      if(this.uploadShorVideo=true){
           //uploaded in to aws to get file link
       this.service.uploadtoAWS(this.VideoConvert.value).subscribe(res => {
      console.log("result on the way");
      
      console.log("aws video link =", res);

      this.videoUrl=res;
      console.log("aws vide file url : ",this.videoUrl.fileURL);

    })

      }else{
        console.log("failed uploading");
        
      }

    });

   

  }



  picture: string;
  handleFileSelect(evt) {
    const file = evt.target.files[0];
    if (!file) {
      return false;
    }
    const reader = new FileReader();

    reader.onload = () => {
      this.picture = reader.result as string;
    };

    console.log(this.picture);
  }

  // call api to convert file


  ngOnInit(): void {




    // get categories call api
    this.service.getcategory().subscribe(res => {
      this.categoriesCollection = res;
      this.categoriesList = this.categoriesCollection.category;
      console.log("categories List = ", this.categoriesList);
    })

  }

  //add course
  addCourse() {
    this.courses.push({
      id: this.courses.length + 1,
      name: '',
      course: ''
    });

    console.log("Courses count",this.courses);
    
  }

  removeCourse(i: number) {
    if(i>=1){
      this.courses.splice(i, 1);
    }
    
  }

  // add section logic

  addSections()
  {
    this.section.push({
      id:this.section.length+1,
      sectionNm:''
    })

    console.log("Section counts",this.section);

   
    
  }


  removeSection(i:number){

    if(i>=1){
      this.section.splice(i,1);
      console.log(i);
    }
   
    
  }

  logValue() {
    console.log(this.courses);
  }

  addcourse1() {
    this.data.uploadcourse(this.addcourse.value).subscribe(result => {
      console.log(result);
    });
  }



//try
result:any="";

save(event:any)
{
  var selectFile= event.target.files;
  for(var i=0; i<selectFile.length; i++)
  {
    this.result += "<br>file Name" +selectFile[i].name;
  }
}






}
