import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';
import { fetchProducts, filterProducts } from '../actions/products.actions';

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
};

export const ProductReducer = createReducer(
  initialState,
  on(fetchProducts, (state, data) => {
    // console.log(state, data);

    return {
      ...state,
      products: data.products,
      filteredProducts: data.products,
    };
  }),
  on(filterProducts, (state, { category }) => {
    if (category === 'all') {
      return { ...state, filteredProducts: state.products };
    }
    const filteredProducts = state.products.filter(
      (item) => item.category === category
    );

    console.log('filtered: ', filteredProducts);
    return { ...state, filteredProducts: filteredProducts };
  })
);
