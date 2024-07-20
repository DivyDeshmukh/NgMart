import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserDataService } from './services/user-data.service';
import { getCartItems } from './store/actions/carts.actions';
import { Store } from '@ngrx/store';
import { Product } from './interfaces/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgMart';
  showHeaderFooter: boolean = true;

  constructor(
    private router: Router,
    private store: Store<{ cartItems: { cartitems: Product[] } }>
  ) {}

  ngOnInit() {
    console.log('Initialized');
    // this.userData.behaviorSubject.subscribe((userData) => {
    //   if (!(userData.authStatus && userData.userData)) {
    //     this.router.navigateByUrl('/login');
    //   }
    // });
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd
        ? console.log(event.url.replace('/', ''))
        : null;
      this.checkHeaderFooter(event);
    });

    // here, we have to call checkHeaderFooter everytime the route changes so to do that we have subscribed to Angular's Router events observable and hence on any change we will receive the update.

    this.store.dispatch(getCartItems({ cartItems: [] }));
  }

  checkHeaderFooter(event: any) {
    if (event instanceof NavigationEnd) {
      if (
        event.url.replace('/auth/', '') === 'login' ||
        event.url.replace('/auth/', '') === 'signup'
      ) {
        console.log('false');

        this.showHeaderFooter = false;
      } else {
        console.log('true');

        this.showHeaderFooter = true;
      }
    }
  }
}
