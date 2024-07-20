import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ cartItem: Product }>()
);

export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{ cartItem: Product }>()
);

export const getCartItems = createAction(
  '[Cart] Get Cart Items',
  props<{ cartItems: Product | [] }>()
);

export const setCartItems = createAction(
  '[Cart] Set Cart Items',
  props<{ cartItems: Product[] }>()
);

export const removeCartItem = createAction(
  '[Cart] Remove Cart Item',
  props<{ id: number; cartItems: Product[] }>()
);

export const updateCartItem = createAction(
  '[Cart] Update Cart Item',
  props<{ id: number; updatedItem: Product }>()
);

export const clearCartFromStorage = createAction(
  '[Cart] Clear cart from storage',
  props<{ cartItems: Product[] }>()
);
export const clearCartItems = createAction('[Cart] Clear Cart');
