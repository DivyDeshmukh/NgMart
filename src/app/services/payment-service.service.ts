import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  payNow() {
    const RazorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100,
      name: 'Divy',
      image:
        'https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png?f=webp',
      key: environment.razorpayKey,
      prefill: {
        name: 'divy',
        email: 'divydeshmukh1104@gmail.com',
        phone: 1234567890,
      },
      theme: {
        color: 'aqua',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };
    const successCallback = (paymentId: any) => {
      console.log(paymentId);
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };

    Razorpay.open(RazorpayOptions, successCallback, failureCallback);
  }
}
