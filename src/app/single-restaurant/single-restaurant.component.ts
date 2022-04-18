import { Address } from 'src/app/common/address';
import { async } from '@angular/core/testing';
import { AddressService } from 'src/app/services/address.service';
import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dishes } from '../interfaces/dishes';
import { Restaurant } from '../interfaces/restaurant';
import { DishesService } from '../services/dishes.service';
import { RestaurantsService } from '../services/restaurants.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.scss'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers

})
export class SingleRestaurantComponent implements OnInit {

  restaurant : Restaurant;
  rateTotal = 0;
  currentRestaurantId: number | undefined;
  dishesList: Dishes[] = [];
  addressList:Address
  public restaurantQrCode = "";
  color = 'accent';
  itemList = new Array(4);
  
  constructor(private restaurantService : RestaurantsService,
              private AddressService: AddressService,
              private dishesService : DishesService,
              private router: ActivatedRoute,
              private route: Router,
              config: NgbRatingConfig) {
      
    //customize default values of ratings used by this component tree
      config.max = 5;
      config.readonly = true;

  }

     ngOnInit() {
     this.router.paramMap.subscribe(() => {
      this.currentRestaurantId =  +this.router.snapshot.paramMap.get('id')
      
      this.restaurantService.getRestaurantDetails(this.currentRestaurantId).subscribe(
          data => {
          console.log('-data-',data)
          console.log('this.currentRestaurantId--'+ this.currentRestaurantId)
          this.restaurant = data              
          this.rateTotal = data.rateTotal;
          this.restaurantQrCode = `${this.restaurant.fullName} - ${this.restaurant.email}-'http://localhost:4200/restaurants/${this.restaurant.id}'}`
        })
        this.AddressService.getAddressForRestaurant(this.currentRestaurantId).subscribe(
          data => {

              console.log('address', data)
          }
        )

      this.dishesService.getDishesByRestaurant(this.currentRestaurantId).subscribe(
        data => {
          console.log('dish', data)
            this.dishesList = data;
        }
      )
    });
    
  }
  
}
