import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private api = "http://localhost:8080/api/rating";

  constructor(private httpClient: HttpClient,
              private route: Router
              ) { }

  submitRating(data: any){
    console.log(data)
    this.httpClient.post(`${this.api}/restaurant`, data).subscribe(
      result => {
         window.location.reload();
      },
      err => {
        console.log(err)
        return null
      }
    )
  }

}
