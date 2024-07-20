import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule, FormsModule],
})
export class ProductModule {}
