import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public apiUrl: string = 'https://fakestoreapi.com/products';
  public behaviorSubject = new BehaviorSubject<Product[]>([]);
  public behaviorActiveAd1 = new BehaviorSubject<string>('Clothing');
  public behaviorActiveAd2 = new BehaviorSubject<string>('all');

  constructor(private http: HttpClient) {}

  // This Observable represents a stream of values that will eventually emit an array of Product objects when the HTTP request completes successfully.
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getActiveAd(): BehaviorSubject<string> {
    return this.behaviorActiveAd1;
  }
}
