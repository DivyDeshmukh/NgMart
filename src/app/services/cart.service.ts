import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  updateCartItems(cartItem: Product): Observable<Product> {
    const storedData = localStorage.getItem('cartItems') || null;
    const parseData: Product[] = storedData ? JSON.parse(storedData) : [];
    console.log('before: ', parseData);

    localStorage.setItem('cartItems', JSON.stringify([...parseData, cartItem]));
    const data = localStorage.getItem('cartItems') || null;
    if (data) {
      console.log('service after updating: ', JSON.parse(data));
    }

    return of(cartItem);
  }

  getCartItems(): Observable<Product[]> {
    const storedItems = localStorage.getItem('cartItems') || null;
    const parseItems = storedItems ? JSON.parse(storedItems) : [];
    return of(parseItems);
  }

  removeItem(id: number): Observable<Product[] | null> {
    const storedItem = localStorage.getItem('cartItems') || null;
    if (storedItem) {
      const parseData = JSON.parse(storedItem);
      const updatedItems = parseData.filter((item: Product) => item.id !== id);
      console.log(updatedItems);

      if (updatedItems) {
        if (updatedItems.length === 0) {
          localStorage.removeItem('cartItems');
          return of([]);
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return of(updatedItems);
      }
    }

    return of(null);
  }

  clearCart(): Observable<[]> {
    localStorage.removeItem('cartItems');
    const isPresent = localStorage.getItem('cartItems') || null;

    if (isPresent) {
      let parseData;
      parseData = JSON.parse(isPresent);
      return of(parseData);
    }
    return of([]);
  }
}
