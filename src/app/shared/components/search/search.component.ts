import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  products: Product[] = [];
  searchResults: { id: number; title: string }[] = [];
  searchTimeout!: any;

  constructor(
    private store: Store<{
      products: { products: Product[]; filteredProducts: Product[] };
    }>
  ) {
    this.store.select('products').subscribe((productState) => {
      this.products = productState.products;
      // console.log(productState.products);
    });
  }

  getSearchResults(query: string) {
    // console.log(query);
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      const searchResults = this.products
        .filter((item): { id: number; title: string } | boolean => {
          const isTitleContainsQuery = item.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const isDescriptionContainsQuery = item.description
            .toLowerCase()
            .includes(query.toLowerCase());
          const isCategoryQuery = item.category
            .toLowerCase()
            .includes(query.toLowerCase());

          if (
            isTitleContainsQuery ||
            isDescriptionContainsQuery ||
            isCategoryQuery
          ) {
            // console.log(item);
            return true;
          }
          return false;
        })
        .map((item) => {
          return { id: item.id, title: item.title };
        });

      console.log(searchResults);
      this.searchResults = searchResults;
    }, 500);
  }
}
