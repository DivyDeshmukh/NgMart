import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
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
  constructor(private store: Store<{ cartItems: { cartItems: Product[] } }>) {}

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

  placeOrder() {
    this.store.dispatch(clearCartFromStorage({ cartItems: this.cartItems }));
  }
}
