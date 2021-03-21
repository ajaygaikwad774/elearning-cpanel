import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddformsService {

  constructor(private http :HttpClient) { }


  //save

  baseUrl = "http://65.0.242.115:7001/elearning/"

  //fetch
  featureCourseUrl: any='http://65.0.242.115:7001/elearning/course/getCouseDtlsById';
  newsall: any='http://65.0.242.115:7001/elearning/feed/getFeedsListAPI'

  uploadnews(data: any){
     return this.http.post(this.baseUrl+'feed/saveFeeds',data);
  }
  uploadinstitude(data: any){
    return this.http.post(this.baseUrl+'institute/updateInstitute',data);
  }
  uploadcourse(data: any){
    return this.http.post(this.baseUrl+'course/saveCourse',data);
  }
  uploadstory(data: any){
    return this.http.post(this.baseUrl+'story/saveStory',data);
  }
  uploadads(data: any){
    return this.http.post(this.baseUrl+'ads/saveAds',data);
  }
  uploadjob(data: any){
    return this.http.post(this.baseUrl+'jobs/saveJobs',data);
  }
  uploadcompany(data: any){
    return this.http.post(this.baseUrl+'company/updateCompanyProfile',data);
  }
  uploadaddprofile(data: any){
    return this.http.post(this.baseUrl+'admin/updateAdminProfile',data);
  }
  uploadplan(data: any){
    return this.http.post(this.baseUrl+'plan/savePlan',data);
  }
  delete(data: any){
    return this.http.post(this.baseUrl+'common/changeStatus' , data);
  }
  changePassword(data: any){
    return this.http.post(this.baseUrl+'common/changePassword' , data);
  }


  //fetch data

  getFeatureCourse()
  {
     return this.http.post(this.featureCourseUrl,{
      "email":"ceo.elearning@gmail.com",
       "encMstCourseId":"mGUTAzJxRrR9azRldA5mRg"
   })

  }

  getnewsall(){
    return this.http.post<any[]>(this.newsall,{
      "email":"ceo.elearning@gmail.com",
   })
  }


  baseurl="http://65.0.242.115:7001/elearning/"

    // get file and convert into base-64
    convertimg(file)
    {
     return this.http.post(this.baseurl+'common/convertFileToBase64',file)
    }
  
    uploadtoAWS(data)
    {
      return this.http.post(this.baseurl+'common/uploadFileToAws',data)
    }


    // Fetch data for edit 
     editUploads(data)
     {
       return this.http.post('http://65.0.242.115:7001/elearning/institute/getInstituteListAPI',data)

     } 

     getStudentById(data){
       return this.http.post('http://65.0.242.115:7001/elearning/student/getStudentProfileDtls',data);
     }

     //Get perticular company job list

     getCompanyJobList(data)
     {
       return this.http.post(this.baseurl+'jobs/getJobListAPI',data)
     }

     // get dashboard counts

     dashboardList(data)
     {
       return this.http.post(this.baseurl+'dashbaord/getAdminDashboardData',data)
     }

    // get subscription plans

    SubscriptionList(data){
      return this.http.post(this.baseurl+'plan/getPlanListApi',data)
    }
  
}