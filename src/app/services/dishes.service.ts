import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dishes } from '../interfaces/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  dishes : Dishes[] = [];

  api = "http://localhost:8080/api/disheses";
  constructor(private httpClient: HttpClient) { }

  getAllDishes(): Observable<Dishes[]> {
    return this.httpClient.get<GetDishesResponse>(this.api).pipe(
      map( response => this.dishes = response._embedded.disheses)
    )
  }

  getAllDishesPaginate(thePage: number, 
                       thePageSize: number): Observable<any>{
    const getUrl = `${this.api}?page=${thePage }&size=${thePageSize}`;                 
    return this.httpClient.get<any>(getUrl)               
  }

  getDishDetails(theDishesId : number): Observable<Dishes>{
    const searchUrl = `${this.api}/${theDishesId}`;
    return this.httpClient.get<Dishes>(searchUrl)
  }

  getDishesByRestaurant(restId: number): Observable<any>{
    const searchUrl = `${this.api}/search/findAllByRestaurantId?id=${restId}`;
    return this.httpClient.get<GetDishesResponse>(searchUrl).pipe(
      map(response => this.dishes = response._embedded.disheses)
    )
  }

  getDishWithNewOrder(): Observable<Dishes[]>{
    const searchUrl = `${this.api}/search/getDishWithNewOrder`;
    return this.httpClient.get<GetDishesResponse>(searchUrl).pipe(
      map(response => this.dishes = response._embedded.disheses)
    )
  }

  //Function search for searchPage with name contain
  //http://localhost:8080/api/disheses/search/findByFullNameContaining?name=k&page=0&size=2
  //Function search for searchPage with name contain
  searchDishesContainNamePaginate(searchValue: string,
    thePage: number,
    thePageSize: number): Observable<any>  {
    const searchUrl = `${this.api}/search/findByNameContainingAndIsActiveTrue?name=${searchValue}`
                      + `&page=${thePage}&size=${thePageSize}`;
                      console.log(searchUrl)
    return this.httpClient.get<any>(searchUrl);
  }

  searchDishesByDishCategory(searchValue: string){
    const searchUrl = `${this.api}/search/findAllByDishCategoryId?name=${searchValue}`;
    console.log(searchUrl)
    return this.httpClient.get<GetDishesResponse>(searchValue).pipe(
      map(response => this.dishes = response._embedded.disheses)
    )
  }
}

interface GetDishesResponse {
  _embedded: {
    disheses: Dishes[];
  }
}

