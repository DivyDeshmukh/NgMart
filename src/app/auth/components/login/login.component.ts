import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private userData: UserDataService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle the login logic here
      const loginData = this.loginForm.value;
      const storedData = localStorage.getItem(
        `${this.loginForm.value.username}`
      );
      if (storedData) {
        console.log(storedData, JSON.parse(storedData));
        const userData = JSON.parse(storedData);
        if (
          loginData.username === userData.username &&
          loginData.password === userData.password
        ) {
          console.log('login Successfull');
          this.userData.updateUserData({ userData, authStatus: true });
          this.router.navigateByUrl('');
        }
      }
    }
  }
}
