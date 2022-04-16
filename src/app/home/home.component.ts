import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../common/offer';
import { Dishes } from '../interfaces/dishes';
import { Restaurant } from '../interfaces/restaurant';
import { DishesService } from '../services/dishes.service';
import { OfferService } from '../services/offer.service';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemList = new Array(4);
  restaurants: Restaurant[]= [];
  offers: Offer[]= [];

  dishWithNewOrder: Dishes[] = [];                 // http://localhost:8080/api/disheses/search/getDishWithNewOrder
  restaurantsOrderByDishUpdate: Restaurant[] = []; // http://localhost:8080/api/restaurants/search/findTop10ByOrderByDishesListUpdatedAtDesc
  restaurantsWithTopRating: Restaurant[] = [];     //	http://localhost:8080/api/restaurants/search/findTop10ByOrderByRatingListUpdatedAtDesc

  

  constructor(private route: Router, 
              private restaurantService: RestaurantsService,
              private dishesService: DishesService,
              private offerService: OfferService) { }

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe(res=>{
      this.restaurants = res;
      console.log(this.restaurants)
    });

    this.getOffers();
    this.getDishWithNewOrder();
    this.getRestaurantsOrderByDishUpdate();
    this.getRestaurantsWithTopRating();
  }

  getDishWithNewOrder(){
    this.dishesService.getDishWithNewOrder().subscribe(
      data => this.dishWithNewOrder = data
    )
  }

  getRestaurantsOrderByDishUpdate(){
    this.restaurantService.findTop8ByOrderByDishesListUpdatedAtDesc().subscribe(
      data => this.restaurantsOrderByDishUpdate = data
    )
  }

  getRestaurantsWithTopRating(){
    this.restaurantService.findTop8ByOrderByRateTotalDesc().subscribe(
      data => this.restaurantsWithTopRating = data
    )
  }

  goToRestaurant(restaurant : Restaurant){
    console.log(restaurant)
    this.route.navigate(['/restaurants', restaurant.id] , {state:{...restaurant} });
  }

  getOffers(){
    this.offerService.getAllOffer().subscribe(
      data => this.offers = data
    )
    console.table(this.offers)
  }

  async goToMyRestaurant(dishes : Dishes) {
    console.log(dishes)
    // get restaurant
    const theRestaurant: Restaurant = await this.restaurantService.getRestaurantByDishesId(dishes.id);

    // navigate to restaurant
    this.route.navigate(['/restaurants', theRestaurant.id] , {state:{...theRestaurant} });
  }

}



