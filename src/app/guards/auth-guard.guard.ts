import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  // CanActivate,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userDataService = inject(UserDataService);
  const router = inject(Router);
  let isAuthenticated = false;
  userDataService.behaviorSubject.subscribe((userData) => {
    isAuthenticated = userData.authStatus;
  });

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

// CanActivate is deprecated
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private userDataService: UserDataService
//   ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     let isAuthenticated = false;

//     this.userDataService.behaviorSubject.subscribe((userData) => {
//       isAuthenticated = userData.authStatus;
//     });

//     if (isAuthenticated) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
