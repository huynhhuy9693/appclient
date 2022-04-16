import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesResponse } from 'src/app/interfaces/favouritesResponse';
import { FavouritesService } from 'src/app/services/favourites.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  loaderRestaurant = new Array(2);

  restaurants: FavouritesResponse[] = [];

  storage: Storage = sessionStorage;
  emailCustomer: string;

  constructor(private route: Router, 
              private favouriteService: FavouritesService) { 
  }

  ngOnInit() {
    this.emailCustomer = this.storage.getItem("userEmail");
    console.log(this.emailCustomer)
    this.getFavourites();
  }

  getFavourites(){
    this.favouriteService.getWishList(this.emailCustomer).subscribe(
      data => {
        this.restaurants = data
        console.log(data)
      }
    )
  }

  goToRestaurant(restaurant){
    console.log('gotoresst')
    // navigate to restaurant
    this.route.navigate(['/restaurants', restaurant.id] , {state:{...restaurant} });
  }

  removeFavourite(restaurant){
    this.favouriteService.removeWishList(restaurant)
  }
}
