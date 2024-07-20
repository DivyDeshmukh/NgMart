import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Ads } from 'src/app/interfaces/ads';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  carouselItems: (Product | Ads)[] = [];
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
  products: Product[] = [];
  ads: Ads[] = [
    {
      id: '1',
      name: 'T-Shirt',
      title: 'Advertisement',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnzqUBX0r39croqzwzEBmg0Ipuz4Zp64qztg&s',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Clothing',
    },
    {
      id: '2',
      name: 'Sweatshirt',
      title: 'Advertisement',
      image:
        'https://st3.depositphotos.com/1177973/12669/i/450/depositphotos_126693854-stock-photo-set-of-body-care-products.jpg',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Earpads',
    },
    {
      id: '3',
      name: 'Jeans',
      title: 'Advertisement',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuzdq4rGJQzUZwAEXGULjKyhn77eI_oCeaw&s',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Headphones',
    },
    {
      id: '4',
      name: 'Hat',
      title: 'Advertisement',
      image:
        'https://thumbs.dreamstime.com/b/open-refrigerator-many-different-products-closeup-132766105.jpg',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Accessories',
    },
    {
      id: '5',
      name: 'Shoes',
      title: 'Advertisement',
      image:
        'https://st3.depositphotos.com/9880800/13987/i/450/depositphotos_139877122-stock-photo-woman-preparing-salad.jpg',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Electronics',
    },
    {
      id: '6',
      name: 'Bag',
      title: 'Advertisement',
      image:
        'https://t4.ftcdn.net/jpg/01/13/80/37/360_F_113803790_GA5ymemnlMH5x1K5lpPlssfAQdMwHvjN.jpg',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Stationary',
    },
  ];
  currentIndex: number = 0;

  constructor(
    private store: Store<{
      products: { products: Product[] };
      // cartItems: { cartItems: Product[] };
    }>,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    console.log();
  }

  ngAfterViewInit() {
    console.log(this.carouselWrapper.nativeElement);
    setInterval(() => {
      this.next();
    }, 2200);
  }

  ngOnInit() {
    this.store
      .select('products')
      .subscribe((productState) => (this.products = productState.products));
    this.carouselItems = [...this.products];
    let i = 0;
    for (let j = 0; j < this.products.length; j++) {
      // console.log(j);

      if ((j + 1) % 4 === 0) {
        this.carouselItems = [
          ...this.carouselItems.slice(0, j + 1),
          this.ads[i],
          ...this.carouselItems.slice(j + 1, this.carouselItems.length),
        ];
        i++;
        // console.log(this.carouselItems, i, (j + 1) % 4 === 0);
      }
    }
    // console.log(this.products, this.ads, this.carouselItems);
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.carouselItems.length - 1;
  }

  next(): void {
    // console.log('called by setInterval');

    this.currentIndex =
      this.currentIndex < this.carouselItems.length - 1
        ? this.currentIndex + 1
        : 0;
  }
}
