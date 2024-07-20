import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FilterBtnsComponent } from './components/filter-btns/filter-btns.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FeaturedProdsComponent } from './components/featured-prods/featured-prods.component';
import { SearchComponent } from './components/search/search.component';
import { AdvertisementsComponent } from './components/advertisements/advertisements.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SharedComponent,
    FilterBtnsComponent,
    CarouselComponent,
    FeaturedProdsComponent,
    SearchComponent,
    AdvertisementsComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, TranslateModule],
  exports: [
    SharedComponent,
    FilterBtnsComponent,
    CarouselComponent,
    FeaturedProdsComponent,
    SearchComponent,
    AdvertisementsComponent,
  ],
})
export class SharedModule {}
