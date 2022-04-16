import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  currentRoute = "helpWithOrder";
  constructor(private activetedRoute: ActivatedRoute ) { 
    this.activetedRoute.url.subscribe(res=>{
     console.log(res);
    });
  }
  changeChildRoute(name){
    this.currentRoute = name;
  }
  
  
  ngOnInit() {
   
  }

}
