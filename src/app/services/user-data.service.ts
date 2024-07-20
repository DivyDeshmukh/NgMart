import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public behaviorSubject = new BehaviorSubject<{
    userData: User | null;
    authStatus: boolean;
  }>({
    userData: null,
    authStatus: false,
  });
  public behaviorLangCode = new BehaviorSubject<string>('en');
  username: string = '';

  constructor() {
    this.behaviorSubject.subscribe((data) => {
      this.username = data.userData?.username || '';
    });
  }

  editProfile(userData: User) {
    console.log(userData);
    localStorage.removeItem(this.username);
    localStorage.setItem(userData.username, JSON.stringify(userData));
    const updatedUserData = localStorage.getItem(userData.username);
    if (updatedUserData) {
      const parsedData = JSON.parse(updatedUserData);
      console.log(parsedData);
      this.updateUserData({ userData: parsedData, authStatus: true });
    }
  }

  updateUserData(userData: { userData: User | null; authStatus: boolean }) {
    this.behaviorSubject.next(userData);
  }

  changeLangCode(code: string) {
    console.log(code);

    this.behaviorLangCode.next(code);
  }
}
