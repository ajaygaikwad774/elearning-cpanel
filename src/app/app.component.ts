import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo1';

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {

    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/login')) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg',);
          document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          
        }
         else {
          const currentUser = this.authenticationService.currentUserValue;

          if (currentUser) {
            this.showSidebar = true;
            this.showNavbar = true;
            this.showFooter = true;
            document.querySelector('.main-panel').classList.remove('w-100');
            document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
            document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
            document.querySelector('.content-wrapper').classList.remove('p-0');
          } 
          else {
            this.showSidebar = false;
            this.showNavbar = false;
            this.showFooter = false;
            document.querySelector('.main-panel').classList.add('w-100');
            document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
            document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg',);
            document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          }
        }
      }
    });

  // Spinner for lazyload modules
  router.events.forEach((event) => {
    if (event instanceof RouteConfigLoadStart) {
      this.isLoading = true;
    } else if (event instanceof RouteConfigLoadEnd) {
      this.isLoading = false;
    }
  });
  }



ngOnInit() {
  // Scroll to top after route change
  this.router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
      return;
    }
    window.scrollTo(0, 0);
  });
}
}
