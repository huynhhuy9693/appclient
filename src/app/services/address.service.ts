import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  api = "http://localhost:8080/api/addresses";

  constructor(private httpClient: HttpClient) { }

  getAddressForRestaurant(restaurantId: number): Observable<Address>{
      const getUrl = `${this.api}/search/findByRestaurant?id=${restaurantId}`;
      return this.httpClient.get<Address>(getUrl);
  }
}


