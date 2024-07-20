import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import {
  addToCart,
  clearCartItems,
  removeCartItem,
  setCartItems,
  updateCartItem,
} from '../actions/carts.actions';

export interface ProductState {
  cartItems: Product[];
}

export const initialState: ProductState = {
  cartItems: [],
};

export const CartReducer = createReducer(
  initialState,
  on(addToCart, (state, { cartItem }) => {
    console.log('reducer for state update: ', cartItem);

    return { ...state, cartItems: [...state.cartItems, cartItem] };
  }),
  on(setCartItems, (state, { cartItems }) => {
    console.log('CartItems: in reducer: ', cartItems);

    return { ...state, cartItems };
  }),
  on(updateCartItem, (state, { id, updatedItem }) => {
    const updateItems = state.cartItems.map((item) =>
      item.id === id ? updatedItem : item
    );
    return { ...state, cartItems: updateItems };
  }),
  on(clearCartItems, (state) => {
    return { ...state, cartItems: [] };
  })
);
