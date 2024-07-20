import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import { UserDataService } from 'src/app/services/user-data.service';
import { addToCart, updateCart } from 'src/app/store/actions/carts.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() index: string = '';
  product: Product | null = null;
  activeTab: string = 'Overview';
  cartItemsNum: number = 0;
  prodQuantity: number = 1;
  prodPrice: number = 0;
  authStatus: boolean = false;

  constructor(
    private store: Store<{
      products: { products: Product[] };
      cartItems: { cartItems: Product[] };
    }>,
    private router: Router,
    private userDataService: UserDataService
  ) {}
  // In Angular, route parameters are typically accessed in the ngOnInit lifecycle hook rather than in the constructor because the component's initialization logic (including the retrieval of route parameters) may not be completed by the time the constructor is called.
  ngOnInit() {
    // console.log(this.index);
    this.getProductDetails();

    this.store.select('cartItems').subscribe((cartState) => {
      this.cartItemsNum = cartState.cartItems.length;
      // console.log('CartItems: ', cartState.cartItems);

      // console.log('Finally in product again: ', this.cartItemsNum);
    });

    if (this.product) {
      this.prodQuantity = this.product.quantity;
      this.prodPrice = this.product.price * this.product.quantity;
      // console.log(this.prodPrice);
    }

    this.userDataService.behaviorSubject.subscribe((data) => {
      this.authStatus = data.authStatus;
    });
  }

  ngOnChanges() {
    // console.log('changed');

    this.getProductDetails();
  }

  setActiveTab(tab: string) {
    console.log(tab);

    this.activeTab = tab;
  }

  handleQuantityChange() {
    // update price
    console.log(this.prodQuantity);

    if (this.product?.price && this.prodQuantity) {
      this.prodPrice = this.product.price * this.prodQuantity;
      console.log('price: ', this.prodPrice, 'quantity: ', this.prodQuantity);
    }
  }

  addToCart() {
    if (!this.authStatus) {
      console.log('Please login first');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (this.product) {
      this.store.dispatch(
        updateCart({
          cartItem: { ...this.product, quantity: this.prodQuantity },
        })
      );
    }
  }

  getProductDetails() {
    this.store.select('products').subscribe((productState) => {
      // console.log(productState.products);
      productState.products.find((product) => {
        // console.log(product.id, this.index);
        if (product.id == Number(this.index)) {
          // console.log(product, this.index);
          this.product = product;
        }
      });
    });
  }
}
