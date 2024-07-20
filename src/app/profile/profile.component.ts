import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentTab: string = 'My Profile';
  orders: Product[] = [];
  editProfile!: FormGroup;
  currentPassword: string = '';
  userData: User | null = null;

  constructor(
    private store: Store<{ cartItems: { cartItems: Product[] } }>,
    private userDataService: UserDataService
  ) {
    this.store.select('cartItems').subscribe((cartState) => {
      this.orders = cartState.cartItems;
      console.log('orders: ', this.orders);
    });

    this.editProfile = new FormGroup({
      fullName: new FormControl(null),
      email: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
      newPassword: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }

  ngOnInit() {
    console.log(this.currentTab);
    this.userDataService.behaviorSubject.subscribe((data) => {
      this.userData = data.userData;
      if (this.userData) {
        this.editProfile.patchValue({
          fullName: this.userData.fullName,
          email: this.userData.email,
          username: this.userData.username,
          password: '',
          newPassword: '',
          confirmPassword: '',
        });
        this.currentPassword = data.userData?.password || '';
      }
    });
  }

  changeCurrentTab(tab: string) {
    console.log(tab);

    this.currentTab = tab;
  }

  handleSubmit(formData: HTMLFormElement) {
    console.log(formData, this.editProfile.value);
    if (this.editProfile.valid) {
      if (
        this.editProfile.value.newPassword ===
          this.editProfile.value.confirmPassword &&
        this.editProfile.value.password === this.currentPassword
      ) {
        const { confirmPassword, newPassword, ...profileData } =
          this.editProfile.value;
        this.userDataService.editProfile({
          ...profileData,
          password: newPassword,
        });
        this.editProfile.value.password.reset();
      } else {
        console.log('Password Incorrect');
      }
    }
  }
}
