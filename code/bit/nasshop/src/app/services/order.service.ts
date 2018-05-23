import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Goods, OrdInfo, OrdGoods } from '../dataClass/defineClass';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordInforUrl  = 'app/ordInforItems';    // URL to web api ,  web api   in Memory
  private ordGoodsUrl  = 'app/ordGoodsItems';    // URL to web api ,  web api   in Memory

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
    getOrdInforItems(): Observable<OrdInfo[]> {

      return this.http.get<OrdInfo[]>(this.ordInforUrl)
          .pipe(
            tap(ordInfos => this.log(`fetched OrdInfos`)),
            catchError(this.handleError('getOrdInforItems', []))
          )
    }
  
    getOrdInforItems_P(): Promise<OrdInfo[] | any > {

      return this.http
          .get<OrdInfo[]>(this.ordInforUrl)
          .toPromise()
          .then(() => this.log(`get Order Infor Items_P`))
          .catch(this.handleError);
    }    

    getOrdGoodsItems(): Observable<OrdGoods[]> {
  
      return this.http.get<OrdGoods[]>(this.ordGoodsUrl)
        .pipe(
          tap(ordGoods => this.log(`fetched OrdGoods`)),
          catchError(this.handleError('getOrdGoodsItems', []))
      )
    }

    getOrdGoodsItems_P(): Promise<OrdGoods[] | any > 
    {
      return this.http.get(this.ordGoodsUrl)
      .toPromise()
      .then(() => this.log(`get OrdInforItems_P`))
      .catch(this.handleError);
    }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  create_OrdInforItem(item: OrdInfo): any
  {
    console.log("In create_OrdInforItem, ordinfo_id: " + item.ordinfo_id);

    return this.http
        .post(this.ordInforUrl, item, httpOptions)
        .toPromise()
        .then(() => this.log(`Add order info item, ordinfo_id=${item.ordinfo_id}`))
        .catch(this.handleError);
  }


  create_OrdGoodsItem(item: OrdGoods): any
  {
    console.log("In create_OrdGoodsItem, ordgoods_id: " + item.ordgoods_id);

    return this.http
        .post(this.ordGoodsUrl, item, httpOptions)
        .toPromise()
        .then( () => this.log(`Add order goods item, ordgoods_id=${item.ordgoods_id}`))
        .catch(this.handleError);
  }

}