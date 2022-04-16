import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  rateTotal = 0;
  color = 'accent';
  currentRestaurantId: number;
  ratingList: Rating[] = [];

  loaderRestaurant = new Array(2);
  constructor(  private router: ActivatedRoute,
                private restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(() => {
      this.currentRestaurantId = +this.router.snapshot.paramMap.get('id')
      console.log(this.currentRestaurantId)
     
      this.restaurantService.getAllRatingById(this.currentRestaurantId).subscribe(
        data => {
          console.log(data)
          this.ratingList = data;
        }
      )
    });
  }

}


type Rating = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  rate: number;
  note: string;
  customer: Customer;
  _links: {}
};


type Customer = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
};