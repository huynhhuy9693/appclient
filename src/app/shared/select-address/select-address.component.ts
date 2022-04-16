import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnChanges, AfterViewInit {

  coords = [];
  constructor(private helperService: HelperService) { }
  
  ngAfterViewInit(): void {
    this.helperService.latLongSubject.subscribe(
      res => {
        this.coords = res;
        console.log(this.coords)
      }
    )
  }
  
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {  
  }

  computeDistance(){
  }

  closeAddressNav(){
    this.helperService.addressSideNav.next(false);
  }


}
