import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  api:string = 'http://localhost:8080/api/rating/restaurant';

  data = {
    'rate': 5,
    'note' : 'good',
    'customerEmail': 'huyhuynh9693@gmail.com',
    'restaurantId': 1
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.post(this.api, this.data).subscribe(
      result => {
        console.log(result)
      },
      err => {
        console.log(err)
      }     
    )
  }

}
