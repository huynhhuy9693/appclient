import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatBadgeModule,
  MatPaginatorModule, 
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MdePopoverModule } from '@material-extended/mde';
import { HomeComponent } from './home/home.component';
import { SingleRestaurantComponent } from './single-restaurant/single-restaurant.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './shared/help/help.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { OrdersComponent } from './account/orders/orders.component';
import { PaymentsComponent } from './account/payments/payments.component';
import { FavouritesComponent } from './account/favourites/favourites.component';
import { AddressesComponent } from './account/addresses/addresses.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { SelectAddressComponent } from './shared/select-address/select-address.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { NgxAutocomPlaceModule } from 'ngx-autocom-place';
import { QRCodeModule } from 'angularx-qrcode';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RestaurantItemComponent } from './home/restaurant-item/restaurant-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodOrderForRestaurantComponent } from './single-restaurant/food-order-for-restaurant/food-order-for-restaurant.component';
import { CartPopoverComponent } from './shared/header/cart-popover/cart-popover.component';
import { CartDetailsForRestComponent } from './single-restaurant/cart-details-for-rest/cart-details-for-rest.component';
import { CartDetailCheckOutComponent } from './cart/cart-detail-check-out/cart-detail-check-out.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { Router } from '@angular/router';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { TabRestaurantComponent } from './search/tab-restaurant/tab-restaurant.component';
import { TabDishesComponent } from './search/tab-dishes/tab-dishes.component';
import { RatingComponent } from './rating/rating.component';
import { RatingDialogComponent } from './shared/rating-dialog/rating-dialog.component';
import { ReviewComponent } from './single-restaurant/review/review.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ContactFormComponent } from './shared/help/contact-form/contact-form.component';


const oktaConfig = Object.assign({ 
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SingleRestaurantComponent,
    FoodOrderForRestaurantComponent,
    SearchComponent,
    HelpComponent,
    MyAccountComponent,
    OrdersComponent,
    PaymentsComponent,
    FavouritesComponent,
    AddressesComponent,
    LoginComponent,
    SignupComponent,
    SelectAddressComponent,
    OfferComponent,
    CartComponent,
    RestaurantItemComponent,
    CartPopoverComponent,
    CartDetailsForRestComponent,
    CartDetailCheckOutComponent,
    OrderHistoryComponent,
    TabRestaurantComponent,
    TabDishesComponent,
    RatingComponent,
    RatingDialogComponent,
    ReviewComponent,
    ContactFormComponent,
  ],
  imports: [
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    NgxMaterialRatingModule,
    QRCodeModule,
    
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatBadgeModule,
    MdePopoverModule,
    NgxSkltnModule.forRoot(skltnConfig),
    NgxAutocomPlaceModule,
    GooglePlaceModule
  ],
  entryComponents:[
    RatingDialogComponent
  ],
  providers: [{provide: OKTA_CONFIG, useValue: oktaConfig},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {}
