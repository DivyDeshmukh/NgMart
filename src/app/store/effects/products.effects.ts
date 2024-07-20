import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, pipe } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import * as ProductActions from '../actions/products.actions';
import { Product } from 'src/app/interfaces/products';

@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private productService: ProductsService
  ) {}

  fetchProducts = createEffect(() =>
    this.actions.pipe(
      ofType(ProductActions.fetchProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) => {
            const updatedProducts = products.map((product) => ({
              ...product,
              quantity: 1,
            }));
            // console.log('updated', updatedProducts);

            return ProductActions.fetchProducts({ products: updatedProducts });
          })
        )
      )
    )
  );
}
