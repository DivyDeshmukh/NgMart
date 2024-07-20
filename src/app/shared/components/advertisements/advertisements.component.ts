import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/interfaces/ads';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss'],
})
export class AdvertisementsComponent {
  currentAd: string = 'Clothing';

  adverts: Ads[] | null = [
    {
      id: '1',
      name: 'T-Shirt',
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
      image:
        'https://t4.ftcdn.net/jpg/01/13/80/37/360_F_113803790_GA5ymemnlMH5x1K5lpPlssfAQdMwHvjN.jpg',
      price: '13$',
      rating: '3.4',
      reviews: 'afafafafaf',
      category: 'Stationary',
    },
  ];

  constructor(private prodService: ProductsService) {}

  ngOnInit() {
    this.prodService.behaviorActiveAd1.subscribe(
      (activeAd) => (this.currentAd = activeAd)
    );
  }
}
