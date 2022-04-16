import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../common/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  api = "http://localhost:8080/api/offers";

  constructor(private httpClient: HttpClient) { }

  getAllOffer(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.api)
  }

  getOfferForRestautanr(restaurantId: number){
    const searchUrl = `${this.api}/search/findAllByExpiredDateTimeAndRestaurantId?id=${restaurantId}`;
    return this.httpClient.get<Offer[]>(searchUrl); 
  }

  getOfferByCode(){
    
  }

}
