import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { TabDishesComponent } from './tab-dishes/tab-dishes.component';
import { TabRestaurantComponent } from './tab-restaurant/tab-restaurant.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  tabIndex = 0;
  searchValue: string = '';

  @ViewChild(TabRestaurantComponent, { static: false}) restaurantRef : TabRestaurantComponent;
  @ViewChild(TabDishesComponent, { static: false}) dishesRef : TabDishesComponent;

  constructor() {}

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    this.tabIndex = tabChangeEvent.index;
  }

  doSearch(){
    //search for restaurant
    if (this.tabIndex === 0 ) {
      this.restaurantRef.doSearch(this.searchValue.trim());
     
    }else{
       //search for dishes
       this.dishesRef.doSearch(this.searchValue.trim());
    }
  }

  clearSearch(){
      if (this.searchValue != '') {
        this.searchValue = '';
        this.doSearch();
      }  
  }

}
      