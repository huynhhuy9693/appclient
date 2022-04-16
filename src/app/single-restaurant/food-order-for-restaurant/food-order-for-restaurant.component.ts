import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { CartItem } from '../../interfaces/cart';
import { Dishes } from '../../interfaces/dishes';
import { CartService } from '../../services/cart.service';
import { DishesService } from '../../services/dishes.service';


@Component({
  selector: 'app-food-order-for-restaurant',
  templateUrl: './food-order-for-restaurant.component.html',
  styleUrls: ['./food-order-for-restaurant.component.scss']
})
export class FoodOrderForRestaurantComponent implements OnInit {
  
  itemList: Dishes[] = [];
  restCartItems: Dishes[] = [];
  restaurantId: number;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private dishesService: DishesService,
              private restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.restaurantId = +this.route.snapshot.paramMap.get('id')

      this.dishesService.getDishesByRestaurant(this.restaurantId).subscribe(
        data => {
            this.itemList = data;
            
            this.getCartForRest();          
        }
      )
    });
  }

  remove(item: Dishes){
    console.log(item.quantity)
    if ( item.quantity > 0) {
        item.quantity--;
        console.log(item.quantity)
        console.log(item)
        this.addToCart(item)
      }
  }

  add(item: Dishes){
    if(this.checkDiffRestaurant()){
      item.quantity++;
      console.log(item.quantity)
      console.log(item);
      this.addToCart(item);
    }
  }

  checkDiffRestaurant(){   
    //Logic check if diffrent restaurant --> cart will remove.
    console.log(this.cartService.cartItems.length)
    if (this.cartService.cartItems.length > 0) {
      if(this.cartService.cartItems[0].restanrantId != this.restaurantId){
        if (confirm("Do you want to add to cart for new restaurant? All cart in previous restaunrant will remove!") == true){
          this.cartService.removeCartItems();       
        }else{
          return false;
        }
      }       
    }
    return true;
  }

  addToCart(item: Dishes) { 

    const theCartItem = new CartItem(item);
    theCartItem.restanrantId = this.restaurantId;
    this.cartService.addToCart(theCartItem);
  }


  getCartForRest() {
    if (this.itemList.length > 0) {
      this.itemList.forEach( r => {
        this.cartService.cartItems.forEach( s => {                 
            //if food id existed in cart, set quantity
            if (r.id === s.id) {
              r.quantity = s.quantity
            }
        })
      })
    }
  }

}
