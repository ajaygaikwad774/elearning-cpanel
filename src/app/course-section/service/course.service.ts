import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor( private http:HttpClient) { }

  
  baseurl:any="http://65.0.242.115:7001/elearning/";

  // get catergories for course
  getcategory()
  {
    return this.http.post(this.baseurl+'category/getAllCategoryList', {
      "email":"admin@gmail.com",

      "status": "ACTIVE"
    })
  }

  // get file and convert into base-64
  convertimg(file)
  {
   return this.http.post(this.baseurl+'common/convertFileToBase64',file)
  }

  uploadtoAWS(data)
  {
    return this.http.post(this.baseurl+'common/uploadFileToAws',data)
  }

}
 