import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Student, Unlock } from '../dataClass/defineClass';
import { Transaction } from '../dataClass/defineClass'


export class PwdChangeStatusModel {
    _body: string;
    status: number;
    statusText: string;
}


@Injectable({
    providedIn: 'root'
})
export class RemoteService {

    public site: string;

    constructor(private http: Http) {

        //this.site = 'https://pacific-plains-55185.herokuapp.com/';
        this.site = 'http://localhost:8685';
        //this.site = 'https://testnet.nebulas.io';
        // https://pacific-plains-55185.herokuapp.com/api/students
    }

    getNebState(): Promise<any>   // is good, works !!
    {
        //let url = 'http://localhost:8685/v1/user/nebstate';
        let url  = this.site + '/v1/user/nebstate';

        return this.http.get(url)
            .toPromise()
            //.then(() => this.log(`get OrdInforItems_P`))
            .catch(this.handleError);
    }

    /* For Testing
    getProducts(): Promise<Student[] | any> {

        //let url  = this.site + 'api/students';
        let url = 'http://localhost:8685/v1/user/nebstate';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });   // For mean
        let options = new RequestOptions({ headers: headers });

        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json() as Student[])
            .catch(this.handleError);
    }
    */


    getAccountState(address: string): Promise<any> {

        let url  = this.site + '/v1/user/accountstate';
        //let url = 'http://localhost:8685/v1/user/accountstate';
        //let url = 'https://testnet.nebulas.io/v1/user/accountstate';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });   // For mean

        let options = new RequestOptions({ headers: headers });

        //return this.http.post(url, {"address":"n1MjR3J28LPYGSVNGYC8DWsM7VJaAqqPnWH"}, options)  // local address
        return this.http.post(url, { "address": address }, options)    // Test net address
            .toPromise()
            //.then(response => response.json() as CardBalance)
            .then(response => this.parsePwdChangeData(response))
            .catch(this.handleError);
    }


    sendTransaction(transaction: Transaction): Promise<any> {

        let url  = this.site + '/v1/admin/transaction';
        //let url = 'http://localhost:8685/v1/admin/transaction';
        //let url = 'http://localhost:8685/v1/user/accountstate';
        //let url = 'https://testnet.nebulas.io/v1/user/accountstate';

        console.log(transaction);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });   // For mean
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, transaction, options)    // Test net address
            .toPromise()
            //.then(response => response.json() as CardBalance)
            .then(response => this.parsePwdChangeData(response))
            .catch(this.handleError);
    }


    unlock(unlock: Unlock): Promise<any> {

        let url = this.site + '/v1/admin/account/unlock';
        //let url = 'https://testnet.nebulas.io/v1/admin/account/unlock';

        console.log(url);
        console.log(unlock);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });   // For mean
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, unlock, options)    // Test net address
            .toPromise()
            //.then(response => response.json() as CardBalance)
            .then(response => this.parsePwdChangeData(response))
            .catch(this.handleError);
    }



    // Retreival of JSON from .NET is a success. ----------------------------------------------------------------------------
    // I had trouble parsing the passwordChange response with extractData so I created this custom function to do it.
    private parsePwdChangeData(res: Response) {
        let pwdChangeStatus = new PwdChangeStatusModel();
        pwdChangeStatus._body      = res["_body"];
        pwdChangeStatus.status     = res["status"];
        pwdChangeStatus.statusText = res["statusText"];
        return pwdChangeStatus || {};
    }

    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }


}
