import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Restaurant } from '../interfaces/restaurant';
import { AddressService } from './address.service';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  restaurantSubject = new BehaviorSubject({});
  $restaurantSubject= this.restaurantSubject.asObservable();

  restaurants : Restaurant[] = [];
  restaurant: Restaurant;
  currRestAddr: any;
  private api = "http://localhost:8080/api/restaurants";
  
  constructor(private httpClient: HttpClient,
              private addressService: AddressService) { }

  getAllRestaurantsPaginate(thePage: number, 
                            thePageSize: number): Observable<any> {
    const getUrl = `${this.api}?page=${thePage }&size=${thePageSize}`;

    return this.httpClient.get<any>(getUrl).pipe(
      map ( response => {
        
        response._embedded.restaurants.forEach(element => {
          this.addressService.getAddressForRestaurant(element.id).subscribe(
            data => {
              element.address = data
            },
             error => {
                console.log('address not found!');
             }         
          )
        });
        return response;
      }) 
    )
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<GetRestaurantsResponse>(this.api + "/search/findByIsActiveTrue").pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    ) 
  }


  findTop8ByOrderByDishesListUpdatedAtDesc(): Observable<Restaurant[]> {
    const searchUrl = `${this.api}/search/findTop8ByOrderByDishesListUpdatedAtDesc`;
    return this.httpClient.get<GetRestaurantsResponse>(searchUrl).pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    ) 
  }

  findTop8ByOrderByRatingListUpdatedAtDesc(): Observable<Restaurant[]> {
    const searchUrl = `${this.api}/search/findTop8ByOrderByRatingListUpdatedAtDesc`;
    return this.httpClient.get<GetRestaurantsResponse>(searchUrl).pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    ) 
  }

  findTop8ByOrderByRateCountDesc(): Observable<Restaurant[]> {
    const searchUrl = `${this.api}/search/findTop8ByOrderByRateCountDesc`;
    return this.httpClient.get<GetRestaurantsResponse>(searchUrl).pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    ) 
  }

  findTop8ByOrderByRateTotalDesc(): Observable<Restaurant[]> {
    const searchUrl = `${this.api}/search/findTop8ByIsActiveTrueOrderByRateTotalDesc`;
    return this.httpClient.get<GetRestaurantsResponse>(searchUrl).pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    ) 
  }

  //Function search for searchPage with name contain
  searchRestaurantsContainNamePaginate(searchValue: string,
                                      thePage: number,
                                      thePageSize: number): Observable<any>  {
    const searchUrl = `${this.api}/search/findByFullNameContainingAndIsActiveTrue?name=${searchValue}`
                    + `&page=${thePage}&size=${thePageSize}`;
    console.log(searchUrl)
    return this.httpClient.get<any>(searchUrl);
  }

  //Function search for searchPage with name contain
  searchRestaurantsContainName(searchValue: string) {
    const searchUrl = `${this.api}/search/findByFullNameContaining?name=${searchValue}`;
    return this.httpClient.get<GetRestaurantsResponse>(searchUrl).pipe(
      map( response => this.restaurants = response._embedded.restaurants)
    )
  }

  getRestaurantDetails(theRestaurantId: number): Observable<Restaurant>{
    const searchUrl = `${this.api}/${theRestaurantId}`;
    return  this.httpClient.get<Restaurant>(searchUrl).pipe(
      map (mainData => {
        this.restaurant = mainData;
        this.addressService.getAddressForRestaurant(mainData.id).subscribe(
          data => {
            this.restaurant.address = data;
            this.currRestAddr = data;
          },
           error => {
              console.log('address not found!');
              this.restaurant.address = undefined;
           }         
        )
        this.restaurantSubject.next(this.restaurant);    
        return this.restaurant;
      })
    )
  } 

  async getRestaurantByDishesId(theId: number): Promise<Restaurant>{
    const searchUrl = `${this.api}/search/findByDishesListId?id=${theId}`;
    console.log(searchUrl)
    await this.httpClient.get<Restaurant>(searchUrl).toPromise().then(
       result => {
          this.restaurant = result;
          this.addressService.getAddressForRestaurant(result.id).toPromise().then(
            result => this.restaurant.address = result
        )
      }
    )
    return this.restaurant
  }

  ratingList : [] = [];
  getAllRatingById(restaurantId: number){
    const searchUrl = `${this.api}/${restaurantId}/ratingList`;
    console.log(searchUrl)
    return this.httpClient.get<RatingResponse>(searchUrl).pipe(
      map( response => this.ratingList = response._embedded.ratings)
    )
  }
}


interface RatingResponse{
  _embedded: {
    ratings : []
  }
}


interface GetRestaurantsResponse {
  _embedded: {
    restaurants: Restaurant[];
  },
  page: {
    size: number, //size off the page
    totalElements: number,
    totalPages: number, //total pages available
    number: number //current page number
  }
}
