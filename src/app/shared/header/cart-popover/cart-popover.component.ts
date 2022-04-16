import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { CartItem } from '../../../interfaces/cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.scss']
})
export class CartPopoverComponent implements OnInit {

  itemList: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity:number = 0;
  restaurantInCart : Restaurant;

  constructor(public cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    
    // this.restaurantDetail();
    this.listCartDetail();
  }

  async restaurantDetail() {
    await this.cartService.$restaurantInCar.subscribe(
      data => {
       this.restaurantInCart = data
       console.log('data : ',data)
      }
    )
  }

  listCartDetail() {
    this.cartService.cartItemsSubject.subscribe(
      data => this.itemList = data
    )

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeCartTotals();
  }

  goToRestaurant(){
    this.router.navigate(['restaurants', this.itemList[0].restanrantId]);
  }

}
function restaurantDetail() {
  throw new Error('Function not implemented.');
}

