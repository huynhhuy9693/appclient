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
      const getUrl = `http://localhost:8080/api/restaurants/${restaurantId}/address`;
      return this.httpClient.get<Address>(getUrl);
  }
}
