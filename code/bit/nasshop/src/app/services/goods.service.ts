import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Goods} from '../dataClass/defineClass';
import { MessageService } from './message.service';
 
import { Http, Response, Headers, RequestOptions } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  public site:string;

  private goodsUrl = 'api/goods';  // URL to web api
  //private goodsUrl = 'https://pacific-plains-55185.herokuapp.com/api/students';  // URL to web api

  

  private nasUrl = 'testnet.nebulas.io/v1/user/nebstate';  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 

      this.site = 'http://localhost:8685/v1/user/nebstate'
      //this.site = "https://testnet.nebulas.io/v1/user/nebstate";
      //this.site = "localhost:8685/v1/user/accountstate";
      //this.site = "https://pacific-plains-55185.herokuapp.com/api/students";
    }
 
/*   Get From Array: 
    getgoods(): Observable<Good[]> {
      return of(goods);
    }
*/


// Not work here, because of HttpClient ??, move to remote service
getNebState(): Promise< any > 
{
  return this.http.get(this.site)
  .toPromise()
  .then(() => this.log(`get OrdInforItems_P`))
  .catch(this.handleError);
}


  /** GET goods from the server */
/*   Not work -- new way ??
  getNebState (){

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});   // For mean
    let options = new RequestOptions({ headers: headers });      

      return this.http.get<any>(this.site, httpOptions)
      .pipe(
        tap(goods => this.log(`fetched goods`)),
        catchError(this.handleError('get all goods', []))
      );
  }
*/

  getAccountState (){

    return this.http.post<any>(this.site, {"address":"n1FF1nz6tarkDVwWQkMnnwFPuPKUaQTdptE"}, httpOptions)
    .pipe(
      tap((Item: any) => this.log(`added Item w/ id=`)),
      catchError(this.handleError<any>('added Item'))
    );
  }



  /** GET goods from the server */
  getGoods (): Observable<Goods[]> {

    console.log("Get goods");
    return this.http.get<Goods[]>(this.goodsUrl)
      .pipe(
        tap(goods => this.log(`fetched goods`)),
        catchError(this.handleError('get all goods', []))
      );
  }


  /** GET Good by id. Return `undefined` when id not found */
  getGoodNo404<Data>(id: number): Observable<Goods> {
    const url = `${this.goodsUrl}/?id=${id}`;
    return this.http.get<Goods[]>(url)
      .pipe(
        map(goods => goods[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Good id=${id}`);
        }),
        catchError(this.handleError<Goods>(`got Goods id=${id}`))
      );
  }
 
  /** GET Good by id. Will 404 if id not found */
  getGood(id: number): Observable<Goods> {
    const url = `${this.goodsUrl}/${id}`;
    return this.http.get<Goods>(url)
    .pipe(
      tap(_ => this.log(`fetched Good id=${id}`)),
      catchError(this.handleError<Goods>(`got Goods id=${id}`))
    );
  }
 
  /* GET goods whose name contains search term */
  searchgoods(term: string): Observable<Goods[]> {
    if (!term.trim()) {
      // if not search term, return empty Good array.
      return of([]);
    }
    return this.http.get<Goods[]>(`api/goods/?name=${term}`).pipe(
      tap(_ => this.log(`found goods matching "${term}"`)),
      catchError(this.handleError<Goods[]>('searched goods', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new Item to the server */
  addGoods (Item: Goods): Observable<Goods> {

    return this.http.post<Goods>(this.goodsUrl, Item, httpOptions).pipe(
      tap((Item: Goods) => this.log(`added Item w/ id=${Item.id}`)),
      catchError(this.handleError<Goods>('added Item'))
    );
  }
 
  /** DELETE: delete the Item from the server */
  deleteGoods (Item: Goods | number): Observable<Goods> {
    const id = typeof Item === 'number' ? Item : Item.id;
    const url = `${this.goodsUrl}/${id}`;
 
    return this.http.delete<Goods>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Item id=${id}`)),
      catchError(this.handleError<Goods>('deleted Item'))
    );
  }
 
  /** PUT: update the Item on the server */
  updateGoods (Item: Goods): Observable<any> {
    return this.http.put(this.goodsUrl, Item, httpOptions).pipe(
      tap(_ => this.log(`updated Item id=${Item.id}`)),
      catchError(this.handleError<any>('updated Item'))
    );
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
 
  /** Log a Service message with the MessageService */
  private log(message: string) {
    this.messageService.add('Service: ' + message);
  }
}