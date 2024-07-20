import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter-btns',
  templateUrl: './filter-btns.component.html',
  styleUrls: ['./filter-btns.component.scss'],
})
export class FilterBtnsComponent implements OnInit {
  activeAdv: string = 'Clothing';
  activeCat: string = 'all';
  @Input() categories1: string[] = [];
  @Input() categories2: string[] = [];

  constructor(private productService: ProductsService) {
    this.productService.behaviorActiveAd1.subscribe(
      (activeAd) => (this.activeAdv = activeAd)
    );
    this.productService.behaviorActiveAd2.subscribe(
      (activeAd) => (this.activeCat = activeAd)
    );
  }

  ngOnInit() {
    console.log('1: ', this.categories1);
    console.log('2: ', this.categories2);
  }

  setActiveAdv1(val: string) {
    console.log(val);
    this.productService.behaviorActiveAd1.next(val);
  }

  setActiveCat(val: string) {
    console.log(val);
    this.productService.behaviorActiveAd2.next(val);
  }
}
