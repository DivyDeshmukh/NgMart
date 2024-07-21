import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import { PaymentService } from 'src/app/services/payment-service.service';
import {
  clearCartFromStorage,
  clearCartItems,
} from 'src/app/store/actions/carts.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  cartItems: Product[] = [];
  subTotal?: number;
  total?: number;
  shipping: number = 0;
  isOrderPlaced: boolean = false;

  constructor(
    private store: Store<{ cartItems: { cartItems: Product[] } }>,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select('cartItems').subscribe((cartState) => {
      this.cartItems = cartState.cartItems;
      if (this.cartItems) {
        this.subTotal = this.cartItems.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0);
        this.total = this.subTotal + this.shipping;
      }
    });
  }

  initiatePayment() {
    this.paymentService.payNow();
    this.store.dispatch(clearCartFromStorage({ cartItems: this.cartItems }));
    this.isOrderPlaced = true;
  }
}
