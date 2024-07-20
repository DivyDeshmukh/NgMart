import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
import {
  fetchProducts,
  filterProducts,
} from 'src/app/store/actions/products.actions';

@Component({
  selector: 'app-featured-prods',
  templateUrl: './featured-prods.component.html',
  styleUrls: ['./featured-prods.component.scss'],
})
export class FeaturedProdsComponent {
  products: Product[] = [];
  currentCategory: string = 'all';

  constructor(
    private store: Store<{
      products: { products: Product[]; filteredProducts: Product[] };
    }>,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.store
      .select('products')
      .subscribe(
        (productState: {
          products: Product[];
          filteredProducts: Product[];
        }) => {
          console.log('products: ', productState.filteredProducts);
          this.products = productState.filteredProducts;
          console.log(this.products);
        }
      );

    this.productService.behaviorActiveAd2.subscribe((activeCat) => {
      this.currentCategory = activeCat;
      console.log('featuredProds: currentcat', this.currentCategory);
      this.store.dispatch(filterProducts({ category: this.currentCategory }));
      // use a different method for updating or filtering this.products or products in store
      // filter prods based on the current category
    });
  }

  ngOnInit() {
    this.store.dispatch(fetchProducts({ products: this.products }));
  }
}
