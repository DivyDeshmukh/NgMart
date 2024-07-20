import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  notSigned: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(formData: HTMLFormElement) {
    if (this.signupForm.valid) {
      this.notSigned = false;

      const storeData = JSON.stringify({
        ...this.signupForm.value,
      });
      localStorage.setItem(`${this.signupForm.value.username}`, storeData);
      this.router.navigateByUrl(`/auth/login`);
    }
  }
}
