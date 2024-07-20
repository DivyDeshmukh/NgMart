import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data.service';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './store/reducers/products.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/products.effects';
import { CartReducer } from './store/reducers/carts.reducers';
import { CartEffects } from './store/effects/carts.effects';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ products: ProductReducer, cartItems: CartReducer }),
    EffectsModule.forRoot([ProductEffects, CartEffects]),
    MainModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
