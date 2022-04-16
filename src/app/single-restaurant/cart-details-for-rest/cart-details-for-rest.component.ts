import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart';
import { User } from 'src/app/interfaces/Ilogin';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { CartService } from 'src/app/services/cart.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoginService } from 'src/app/services/login.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-cart-details-for-rest',
  templateUrl: './cart-details-for-rest.component.html',
  styleUrls: ['./cart-details-for-rest.component.scss']
})
export class CartDetailsForRestComponent implements OnInit {

  user: User;
  items: CartItem[] = [];

  totalPrice: number = 0;
  totalQuantity:number = 0;
  restaurant: any;

  constructor( public loginService: LoginService,
               private cartService: CartService,
               private restaurantService: RestaurantsService) {}

ngOnInit() {

  this.loginService.loggedIn.subscribe(next => {
  this.user = next;
  });

  this.listCartDetail();

}

listCartDetail() {
  this.cartService.cartItemsSubject.subscribe(
  data => this.items = data
  )

  this.cartService.totalPrice.subscribe(
  data => this.totalPrice = data
  )

  this.cartService.totalQuantity.subscribe(
  data => this.totalQuantity = data
  )

  this.cartService.computeCartTotals();
}

remove(item: CartItem){
  console.log(item.quantity)
  if ( item.quantity > 0) {
      item.quantity--;
      console.log(item.quantity)
      console.log(item)
      this.addToCart(item)
    }
}

add(item: CartItem){
    item.quantity++;
    console.log(item.quantity)
    console.log(item);
    this.addToCart(item);
}

addToCart(theCartItem: CartItem) { 
  this.cartService.addToCart(theCartItem);
}

}
