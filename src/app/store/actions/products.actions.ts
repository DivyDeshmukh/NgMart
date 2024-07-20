import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';

export const fetchProducts = createAction(
  '[Products] Fetch Products',
  props<{ products: Product[] }>()
);

export const filterProducts = createAction(
  '[Products] filterProducts',
  props<{ category: string }>()
);
