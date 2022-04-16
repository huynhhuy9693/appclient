import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  addressSideNav = new BehaviorSubject(false);
  loginSideNav = new BehaviorSubject(false);
  enableAccount = new BehaviorSubject('signin');


  latLongSubject = new BehaviorSubject([]);

  searchData = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }



}
