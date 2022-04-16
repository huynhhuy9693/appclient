import { Injectable } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { BehaviorSubject } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user?: User;
  loggedIn = new BehaviorSubject(this.user);

  isAutenticated: boolean = false;

  constructor(private oktaAuthService: OktaAuthService) {
    
  }

  isLoggedIn(): boolean {
    console.log(this.loggedIn);
    return true;
  }
}
