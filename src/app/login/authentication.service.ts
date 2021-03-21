import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  authUser:any;

  private baseUrl = 'http://65.0.242.115:7001/elearning';

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.authUser=  JSON.parse(localStorage.getItem('authuser'))
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(emailId, pwd , type) {
      return this.http.post<any>(this.baseUrl+'/user/authenticateUser', { emailId, pwd,type })
          .pipe(map(user => {
              console.log("user set valje ",user);
              
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);

              localStorage.setItem('authuser',JSON.stringify('atul'))
              return user;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

}
