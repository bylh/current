import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Goods, CartItem } from '../dataClass/defineClass';
import { MessageService } from './message.service';
 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {   // Service Class ---------------------------------------------------------------------------------

  private cartUrl = 'api/cartItems';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    
  getItems_O(): Observable<CartItem[]> {
      return this.http.get<CartItem[]>(this.cartUrl)
        .pipe(
          tap(cartItems => this.log(`Fetched CartItems_O`)),
          catchError(this.handleError('getCartItems', []))
        )
    }

    getItems_P(): Promise<CartItem[] | any> {

      return this.http.get(this.cartUrl)
          .toPromise()
          .catch(this.handleError);
    }

  // GET CartItem by id. Return `undefined` when id not found 
  getCartItemNo404<Data>(id: number): Observable<CartItem> {
    const url = `${this.cartUrl}/?id=${id}`;
    return this.http.get<CartItem[]>(url)
      .pipe(
        map(goods => goods[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Good id=${id}`);
        }),
        catchError(this.handleError<CartItem>(`got Goods id=${id}`))
      );
  }
 
  // GET CartItem by id. Will 404 if id not found 
  getItem_O(id: number): Observable<CartItem> {
    const url = `${this.cartUrl}/${id}`;
    return this.http.get<CartItem>(url)
    .pipe(
      tap(_ => this.log(`Fetched Cart Item_O, id=${id}`)),
      catchError(this.handleError<CartItem>(`getCartItem id=${id}`))
    );
  }

  // POST: add a new CartItem to the server 
  addItem_O (Item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.cartUrl, Item, httpOptions)
    .pipe(
      tap((Item: CartItem) => this.log(`added CartItem w/ id=${Item.id}`)),
      catchError(this.handleError<CartItem>('CartItem'))
    );
  }

  addItem_P(item: CartItem): any 
  {
    console.log("creat item +++++++ ");
    console.log(item);

    return this.http
        .post(this.cartUrl, item, httpOptions)
        .toPromise()
        .then( () => this.log(`Add Cart Item_P, id=${item.id}`))
        .catch(this.handleError);
  }


  // PUT: update the Item on the server 
  updateItem_O (Item: CartItem): Observable<CartItem> 
  {
    return this.http.put(this.cartUrl, Item, httpOptions)
    .pipe(
      tap(_ => this.log(`Updated Cart Item_O, id=${Item.id}`)),
      catchError(this.handleError<any>('updated Item'))
    );
  }  

  updateItem_P (Item: CartItem): any 
  {
    return this.http.put(this.cartUrl, Item, httpOptions)
    .pipe(
      tap(_ => this.log(`Updated Cart Item_O, id=${Item.id}`)),
      catchError(this.handleError<any>('updated Item'))
    );
  }  


  // delete one
  deleteItem_O(item: CartItem): Observable<CartItem> {

    console.log("In cart Service, delete item: ");
    console.log(item);

    const url = `${this.cartUrl}/${item.id}`;
    return this.http.delete(url)
      .pipe(
        tap((Item: CartItem) => this.log(`deleted cart item w/ id=${item.id}`)),
        catchError(this.handleError<CartItem>('CartItem'))
    );
  }

  deleteItems_O(): Observable<void> {
    const url = `${this.cartUrl}/$`;
    return this.http.delete(url)
      .pipe(
        tap(_ => null),
        catchError(this.handleError<any>('CartItem'))
      );
    }

  // delete all 
  deleteItems_P(): Promise<void> {

    const url = `${this.cartUrl}/$`;
    return this.http.delete(url, httpOptions)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  //**
  // * Handle Http operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
  private handleError<T> (operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  //** Log a ItemService message with the MessageService 
  private log(message: string) {
    this.messageService.add('Service: ' + message);
  }

}