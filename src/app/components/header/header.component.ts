import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { NavItem } from 'src/app/interfaces/navItems';
import { User } from 'src/app/interfaces/user';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languageCode: string = 'en';
  menuActive = false;
  currentPath: string = '';
  userInfo: { userData: User | null; authStatus: boolean } | null = null;
  navItems: NavItem[] = [];

  constructor(
    private userData: UserDataService,
    private router: Router // private translateService: TranslateService
  ) {
    // const userLang = navigator.language || 'en';
    // this.languageCode = userLang.split('-')[0] || 'en';
    // this.translateService.setDefaultLang(this.languageCode);
    // this.translateService.use(this.languageCode);
  }

  ngOnInit() {
    this.userData.behaviorSubject.subscribe(
      (userData) => (this.userInfo = userData)
    );

    this.navItems = [
      {
        name: 'Home',
        slug: '/',
        active: true,
      },
      {
        name: 'Login',
        slug: '/auth/login',
        active: !this.userInfo?.authStatus,
      },
      {
        name: 'Signup',
        slug: '/auth/signup',
        active: !this.userInfo?.authStatus,
      },
      {
        name: 'Search',
        slug: '/search',
        active: this.userInfo?.authStatus,
      },
      {
        name: 'Cart',
        slug: '/cart',
        active: this.userInfo?.authStatus,
      },
      {
        name: 'Profile',
        slug: '/profile',
        active: this.userInfo?.authStatus,
      },
    ];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url.replace('/', '');
        console.log(this.currentPath);
      }
    });
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  changeLang() {
    console.log(this.languageCode);
    this.userData.changeLangCode(this.languageCode);
  }

  logout() {
    console.log('run');

    if (this.userData.behaviorSubject) {
      this.userData.behaviorSubject.next({ userData: null, authStatus: false });
      this.router.navigateByUrl('/login');
    }
  }
}
