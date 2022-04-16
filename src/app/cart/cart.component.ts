import { logging } from 'protractor';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { HelperService } from '../services/helper.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CartItem } from '../interfaces/cart';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckOutValidators } from '../validators/check-out-validators';
import { CheckoutService } from '../services/checkout.service';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { OktaAuthService } from '@okta/okta-angular';
import { RestaurantsService } from '../services/restaurants.service';
import { HttpClient } from '@angular/common/http';
import { AddressApi } from '../interfaces/address-api';
import { CartDetailCheckOutComponent } from './cart-detail-check-out/cart-detail-check-out.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit{
  
  checkoutFormGroup: FormGroup;

  user: User;
  isAutenticated: boolean = false;

  //customer lat & long
  coordsCustomer = [];


  items: CartItem[] = [];

  totalPrice: number = 0;
  totalQuantity:number = 0;
  totalPriceExchange: number = 0;

  storage: Storage = sessionStorage;

  //places autocomplete
  selectedPlace: any;
  json = JSON;

  options = {
    fields: ["address_component", "adr_address", "geometry"],
    componentRestrictions: {
      country: "vn"
    }
  } 

  @ViewChild(CartDetailCheckOutComponent,{ static: true}) cardDetailCheckOut :CartDetailCheckOutComponent;
  constructor(private helperService: HelperService,
              private router: Router, 
              public loginService: LoginService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private checkoutService: CheckoutService,
              private oktaAuthService: OktaAuthService,
              private ref: ChangeDetectorRef,
              private restaurantService: RestaurantsService,
              private httpClient: HttpClient) {

  }

  ngAfterViewInit(): void {
  }

  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  @ViewChild(CartDetailCheckOutComponent,{ static: true}) CartDetailCheckOutComponentRef: CartDetailCheckOutComponent;
  
  ngOnInit() {

    this.helperService.latLongSubject.subscribe(
       data => {
        this.coordsCustomer = data;
        console.log('data: ' ,data);
        this.setDeliveryAddress();
        
      }
    )

    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAutenticated = result;
        console.log(result)
      }
    )

    this.renderButtonPaypal();


    this.loginService.loggedIn.subscribe(next => {
      this.user = next;
    });

    //read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem("userEmail"));

    this.checkoutFormGroup = this.formBuilder.group({
      
      customer: this.formBuilder.group({
        fullName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), 
                               CheckOutValidators.notOnlyWhitespace]),

        phoneNumber:  new FormControl('', 
                              [Validators.required, 
                               Validators.pattern("[0-9]{8,11}")]),
                               
        email: new FormControl(theEmail,
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
                                [ Validators.required, 
                                  Validators.minLength(2), 
                                  CheckOutValidators.notOnlyWhitespace ]),
        
        ward:   new FormControl('',
                                [ Validators.required, 
                                  Validators.minLength(2), 
                                  CheckOutValidators.notOnlyWhitespace ]),
        
        district:   new FormControl('',
                                [ Validators.required, 
                                  Validators.minLength(2), 
                                  CheckOutValidators.notOnlyWhitespace ]),

        city: new FormControl('',
                              [ Validators.required,
                                Validators.minLength(2),
                                CheckOutValidators.notOnlyWhitespace ]),

        state: new FormControl(''),

        country: new FormControl(''),

        zipCode: new FormControl('')                                                       
      })

    })

    this.listCartDetail();
  }

  renderButtonPaypal() {
    
    paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          
          
        },

        createOrder:  (date, actions) => {
          //exchange money
          this.getTotalPriceExchange();

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.checkoutFormGroup.invalid ? '0' : `${this.totalPriceExchange.toFixed(2)}`,
                  currency_code: 'USD',                  
                }
              }
            ],
          })
        },

        onApprove: (data, actions) => {
          console.log('data 2 : ',data)
          return actions.order.capture().then(details => {
            console.log(details)
            this.saveOrder('Paid with Paypal');
            // alert('Thank you for your successful payment')
          })
        },

        onError: error => {
          console.log(error)
        }
      }
    ).render(this.paypalRef.nativeElement);
  }

  getTotalPriceExchange() {
    let distance = this.CartDetailCheckOutComponentRef.distance;
    let fee_ship = this.CartDetailCheckOutComponentRef.fee_shipping;
    let shipping_money = ( distance >= 1) ? ( distance * fee_ship) : (1 * fee_ship);
    this.totalPriceExchange = (this.totalPrice + shipping_money)/24000;
  }

  listCartDetail() {
    this.cartService.cartItemsSubject.subscribe(
      data => this.items = data     
    )
    

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeCartTotals();
  }

  openLoginSideNav(){
    this.helperService.loginSideNav.next(true);
  }

  remove(item: CartItem){
    console.log(item.quantity)
    if ( item.quantity > 0) {
        item.quantity--;
        this.addToCart(item)
      }
  }

  add(item: CartItem){
      item.quantity++;
      this.addToCart(item);
  }

  addToCart(theCartItem: CartItem) { 
    this.cartService.addToCart(theCartItem);
  }

  
  get fullName() { return this.checkoutFormGroup.get('customer.fullName'); }
  get phoneNumber() { return this.checkoutFormGroup.get('customer.phoneNumber'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressWard() { return this.checkoutFormGroup.get('shippingAddress.ward'); }
  get shippingAddressDistrict() { return this.checkoutFormGroup.get('shippingAddress.district'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      console.log("Cancel submit button");
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    console.log("Handling the submit button");

    this.saveOrder('Cash On Delivery');
    // alert('Thank you for your successful payment')

  }

  saveOrder(payment: string) {
    //setup order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    order.shippingMoney =  (this.CartDetailCheckOutComponentRef.distance >= 1)? 
                                      ( this.CartDetailCheckOutComponentRef.distance * this.cardDetailCheckOut.fee_shipping ): 
                                              ( 1 * this.cardDetailCheckOut.fee_shipping); 
    order.status = payment;

    //get cart items
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map( tempCartItem => new OrderItem(tempCartItem));

    //setup purchase
    let purchase = new Purchase();

    //populate purchase - user
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populete purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    //populate purchase - order and oderItems
    purchase.order = order;
    purchase.orderItem = orderItems;
    
    //call REST API via the CheckoutService
    console.log("purchase: ===============================================================================")
    console.log("purchase: " + purchase)
    console.log(JSON.stringify(purchase, null, 4));
    this.checkoutService.placeOrder(purchase).subscribe(
      response => {
        console.log(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`)
        this.resetCart();
      },
      error => {
          if (error.status == 200) {
            this.resetCart();
          }
          console.log("======================ERROR======================="); 
          console.log(error);         
      }
    )
  }

  resetCart() {
    //reset Cart data
    this.cartService.cartItems = [];
    this.cartService.removeCartItems();
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.cartItemsSubject.next(this.cartService.cartItems);
    
    //reset the form
    this.checkoutFormGroup.reset();

    //navigate back to the home page
    console.log("navigate back to the home page"); 
    this.router.navigateByUrl("/");
  }

  placeChanged(place) {
    this.selectedPlace = place;
    this.ref.detectChanges();
    // doi co api set long and lat cho shippin adress
    const arrAddress = place.formatted_address.split(", ")
    console.log('place : ',place.formatted_address)
    console.log('arrAddress : ', arrAddress)
    this.checkoutFormGroup.get('shippingAddress.street').setValue(arrAddress[0])
    this.checkoutFormGroup.get('shippingAddress.district').setValue(arrAddress[1])
    this.checkoutFormGroup.get('shippingAddress.ward').setValue(arrAddress[2])
    this.checkoutFormGroup.get('shippingAddress.city').setValue(arrAddress[3])
    this.checkoutFormGroup.get('shippingAddress.country').setValue(arrAddress[4])

    //handle cartdetail
    this.CartDetailCheckOutComponentRef.LatLngTo = [
      place.geometry.location.lng(), place.geometry.location.lat()
    ]
    this.CartDetailCheckOutComponentRef.computeDistanceBetween();
}

  setDeliveryAddress() {
    const api = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${this.coordsCustomer[0]}%2C${this.coordsCustomer[1]}`;
    this.httpClient.get<AddressApi>(api).subscribe(
      result => {
        console.log('result : ',result)
        this.checkoutFormGroup.get('shippingAddress.street').setValue(result.address.Address || '')
        this.checkoutFormGroup.get('shippingAddress.district').setValue(result.address.District || '')
        this.checkoutFormGroup.get('shippingAddress.ward').setValue(result.address.Neighborhood || '')
        this.checkoutFormGroup.get('shippingAddress.city').setValue(result.address.City|| '')
        this.checkoutFormGroup.get('shippingAddress.country').setValue(result.address.CountryCode || '')
      }     
    )
    
  }
}


