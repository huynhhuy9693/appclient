import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { AddressApi } from 'src/app/interfaces/address-api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemList = new Array(3);
  
  isAutenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;
  latitude: number;
  longitude: number;
  myAddress: string = '';
  
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  
  constructor(private helperService: HelperService, 
              private cartService : CartService,
              private oktaAuthService: OktaAuthService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {

    console.log('init header')
    if(!navigator.geolocation){
      console.log('location is not support!')
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      const coords = position.coords;
      this.latitude = coords.latitude;
      this.longitude = coords.longitude;
      this.helperService.latLongSubject.next([this.longitude,this.latitude]);
      console.log(`lat: ${position.coords.latitude}, long: ${position.coords.longitude}`);
      this.getMatchAddress();
    })

    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAutenticated = result;
        this.getUserDetails();
      }
    )

    this.updateCartStatus();
  }

  getMatchAddress() {
    const api = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${this.longitude}%2C${this.latitude}`;
    this.httpClient.get<AddressApi>(api).toPromise().then(
      result => {
        console.log('myAddess : ',result)
        this.myAddress = `${result.address.Address}, ${result.address.District}, ${result.address.City}`;
      }
    )
  }

  updateCartStatus() {
    //subscribe to the cart status totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    //subscribe to the cart status totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  getUserDetails() {
    if (this.isAutenticated) {
      
      //Fetch the logged in user details ( user's claims)
      //user fullname is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;

          // retrieve the user's email from authentication response
          const theEmail = res.email;

          // now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      )  
    }
  }

  logout(){
    // Terminates the session with Okta and removes current tokens
    this.oktaAuthService.signOut();
    this.storage.removeItem('userEmail');
    this.cartService.removeCartItems();
    
  }

  openAddressSideNav (){
    this.helperService.addressSideNav.next(true);
  }

  openLoginSideNav(){
    this.helperService.loginSideNav.next(true);
  }
 
}



