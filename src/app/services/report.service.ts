import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  api:string = "http://localhost:8080/api/report";
  constructor(private httpClient: HttpClient) { }

  getOrderhistoryReport(orderTrackingNumber: string){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(`${this.api}/pdf-report/${orderTrackingNumber}`,{ headers: headers, responseType: 'blob'})
  }


}
