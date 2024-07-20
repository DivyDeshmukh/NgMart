import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import * as CartActions from '../actions/carts.actions';
import { Product } from 'src/app/interfaces/products';

@Injectable()
export class CartEffects {
  constructor(private cartService: CartService, private actions: Actions) {}

  addToCart = createEffect(() =>
    this.actions.pipe(
      ofType(CartActions.updateCart),
      exhaustMap(({ cartItem }) => {
        console.log('exhaustMap: ', cartItem);

        return this.cartService.updateCartItems(cartItem).pipe(
          map((item) => {
            console.log('map: ', item);

            return CartActions.addToCart({ cartItem: item });
          })
        );
      })
    )
  );

  setCartitems = createEffect(() =>
    this.actions.pipe(
      ofType(CartActions.getCartItems),
      exhaustMap(() =>
        this.cartService.getCartItems().pipe(
          map((items) => {
            console.log(items);
            return CartActions.setCartItems({ cartItems: items });
          })
        )
      )
    )
  );

  removeCartItem = createEffect(() => {
    return this.actions.pipe(
      ofType(CartActions.removeCartItem),
      exhaustMap(({ id, cartItems }) =>
        this.cartService.removeItem(id).pipe(
          map((items) => {
            console.log(items);

            if (items) {
              return CartActions.setCartItems({ cartItems: items });
            } else {
              return CartActions.setCartItems({ cartItems });
            }
          })
        )
      )
    );
  });

  clearCart = createEffect(() =>
    this.actions.pipe(
      ofType(CartActions.clearCartFromStorage),
      exhaustMap(({ cartItems }) =>
        this.cartService.clearCart().pipe(
          map((items) => {
            if (items.length !== 0) {
              return CartActions.setCartItems({ cartItems });
            }
            return CartActions.clearCartItems();
          })
        )
      )
    )
  );
}
