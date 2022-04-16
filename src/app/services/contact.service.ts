import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api = ''
  constructor(private http: HttpClient){}
  PostMessage(input: any)
  {
    return this.http.post(this.api, input,{responseType : 'text'}).pipe(
      map(
        (response)=>{
          if(response)
          {
            return response
          }
        },
        (error:any)=>
        {
          return error;
        }
        )

      )
    

  }
}
