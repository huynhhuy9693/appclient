import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {
  
  color = 'accent';
  rate: number = 0;
  note: string = "";
  storage: Storage = sessionStorage;
  
  constructor(private ratingService: RatingService,
              public dialogRef: MatDialogRef<RatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { restaurant: Restaurant }) { }

  ngOnInit() {
    console.log(this.data)
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  submitRating(){
    //read the user's email address from browser storage
    let theEmail = JSON.parse(this.storage.getItem("userEmail"));

    const data = {
      rate: this.rate,
      note: this.note,
      customerEmail: theEmail,
      restaurantId: this.data.restaurant.id     
    }
      console.log('------',data)
    if(data.customerEmail!=null)
    {
      if (this.rate != 0 || this.note.trim() != '') {
        this.ratingService.submitRating(data);
        alert('thank')
    }
    }else
    {
      alert('login please')
    }
  }
}
