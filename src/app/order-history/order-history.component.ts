import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { OrderHistoryService } from '../services/order-history.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit ,AfterViewInit {
  
  storage: Storage = sessionStorage;

  displayedColumns: string[] = ['Report', 'orderTrackingNumber', 'totalPrice', 'status', 'createdAt'];
  dataSource = new MatTableDataSource<OrderHistory>([])
  

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  
  expandedElement: any;
  test() {
    console.log('test');
  }

  cellClicked(element) {
    console.log(element.name + ' cell clicked');
  }

  constructor(private orderHistoryService: OrderHistoryService,
              private reportService: ReportService) { }
  
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.handleOrderHistory();
  }

  handleOrderHistory() {

    //read the user's email address from browser storage
    let theEmail = JSON.parse(this.storage.getItem("userEmail"));
    if (theEmail == null) {
      theEmail = "khoaimiday@gmail.com";
    }

    //retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        console.log(data)
        this.dataSource.data = data._embedded.orders;
      }
    )
  }

  openReport(orderTrackingNumber){
    this.reportService.getOrderhistoryReport(orderTrackingNumber).subscribe(
      data => {
        console.log(data);
        let file = new Blob([data], {type: 'application/pdf'});
        let fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    )
  }

}
