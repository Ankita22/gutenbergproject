

import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
baseUrl: string;

getBooksDetails = 'books';
getBookByCategory = this.getBooksDetails + '?topic='

// /books?ids=11,12,13
// /books?languages=en
// /books?mime_type=text%2F    /books?mime_type=text%2Fhtml 
// /books?search=dickens%20great
// /books?topic=children
constructor(private http: HttpClient) {
    this.baseUrl = 'http://skunkworks.ignitesol.com:8000/';
}

//// Common get/post service call Start ///// 
  postCall(url: any, obj: any): any {
    return this.http.post(this.baseUrl + url, obj)
      .map((res: any) => {
        return res;
      }).catch(this.handleError);
  }

  getCall(url: any): any {
    return this.http.get(this.baseUrl + url)
      .map((res: any) => {
        return res;
      }).catch(this.handleError);
  }

  putCall(url: any, obj: any): any {
    return this.http.put(this.baseUrl + url, obj)
      .map((res: any) => {
        return res;
      }).catch(this.handleError);
  }
  //// Common get/post service call End /////


  // Displays the error message
  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }
}
