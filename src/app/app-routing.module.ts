

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleRestaurantComponent } from './single-restaurant/single-restaurant.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './shared/help/help.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { AddressesComponent } from './account/addresses/addresses.component';
import { FavouritesComponent } from './account/favourites/favourites.component';
import { PaymentsComponent } from './account/payments/payments.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';
import { FoodOrderForRestaurantComponent } from './single-restaurant/food-order-for-restaurant/food-order-for-restaurant.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './shared/login/login.component';
import { TabRestaurantComponent } from './search/tab-restaurant/tab-restaurant.component';
import { TabDishesComponent } from './search/tab-dishes/tab-dishes.component';
import { RatingComponent } from './rating/rating.component';
import { ReviewComponent } from './single-restaurant/review/review.component';
import { ContactFormComponent } from './shared/help/contact-form/contact-form.component';


const routes: Routes = [
  { 
    path: 'login/callback', component: OktaCallbackComponent
  },
  { 
    path: 'login', component: LoginComponent
  },
  {
    path: 'restaurants', component: HomeComponent
  },
  {
    path: 'restaurants/:id', component: SingleRestaurantComponent, 
    children : [
        {
          path: '', outlet : 'orderFoodList', component: FoodOrderForRestaurantComponent
        },
        {
          path: 'review/:id', outlet : 'orderFoodList', component: ReviewComponent
        },
    ]
  },
  {
    path: 'dishes', component: SingleRestaurantComponent
  },
  {
    path: 'dishes/:id', component: SingleRestaurantComponent
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'help', component: HelpComponent
  
  },
  {
    path:'contact', component:ContactFormComponent
  },
  {
    path: 'offers', component: OfferComponent
  },
  {
    path: 'cart', component: CartComponent, canActivate: [OktaAuthGuard],
  },
  {
    path: 'rating', component: RatingComponent
  },
  {
    path: 'my-account', component: MyAccountComponent, canActivate: [OktaAuthGuard],
    children: [
      {
        path: 'addresses', component: AddressesComponent
      },
      {
        path: 'favourites', component: FavouritesComponent
      },
      {
        path: 'orders', component: OrderHistoryComponent
      },
      {
        path: 'payments', component: PaymentsComponent
      },

      {
        path: '', redirectTo: 'orders', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'orders', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: 'restaurants', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'restaurants', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
