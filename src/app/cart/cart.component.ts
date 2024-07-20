import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import {
  clearCartFromStorage,
  clearCartItems,
  removeCartItem,
} from 'src/app/store/actions/carts.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: Product[] = [];
  subTotal?: number;
  total?: number;
  shipping: number = 0;
  constructor(private store: Store<{ cartItems: { cartItems: Product[] } }>) {
    this.store.select('cartItems').subscribe((cartState) => {
      this.cartItems = cartState.cartItems;
      console.log('CartItems updated in store: ', this.cartItems);
      if (this.cartItems?.length !== 0) {
        this.subTotal = this.cartItems.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0);
        this.total = this.subTotal + this.shipping;
      }
    });
  }

  removeItem(id: number) {
    console.log(id);
    this.store.dispatch(removeCartItem({ id, cartItems: this.cartItems }));
  }

  clearCart() {
    this.store.dispatch(
      clearCartFromStorage({ cartItems: this.cartItems || [] })
    );
  }
}
