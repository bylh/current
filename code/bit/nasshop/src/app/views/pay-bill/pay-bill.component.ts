import { Component, OnInit } from '@angular/core';
import { Transaction, Transaction_Result, AccountState_Result, PwdChangeStatusModel } from '../../dataClass/defineClass';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RemoteService } from '../../services/remote.service';


export class Result {
    result: Transaction_Result;
}

export class Account_Result {
    result: AccountState_Result;
}


@Component({
    selector: 'app-pay-bill',
    templateUrl: './pay-bill.component.html',
    styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {

    // For : route.params.subscribe(params => {}
    private sub: any;

    private transaction: Transaction;
    //private account_Result: Account_Result;

    from: string = 'n1FF1nz6tarkDVwWQkMnnwFPuPKUaQTdptE';
    to: string = 'n1MjR3J28LPYGSVNGYC8DWsM7VJaAqqPnWH';     // Made by Ming, pw : 1
    value: string = '1000000000000000000';     // same with balance
    nonce: number = 20;
    gasPrice: string = '1000000';
    gasLimit: string = '200000';

    password: string = 'passphrase';
    balance : string = '';      // Client balance
    toBalance : string = '';    // Owner Balance

    resultAPI: Result;

    netTypeArr = [
        {value: '0', name: "Testnet"},
        {value: '1', name: "Local Nodes"},
        {value: '2', name: "Mainnet"},
        ];
    
    netType: string = '1';


    constructor(private route: ActivatedRoute,
        private remoteService: RemoteService
    ) { }

    ngOnInit() {
        console.log(this.route.params);

        this.sub = this.route.params.subscribe(params => {

            this.value = params['money'];
        });
        // For test : this.getAccountState(this.from);
    }


    getAccountState(address: string) {

        this.remoteService.getAccountState(address).then((cardBalance: PwdChangeStatusModel) => {

            console.log("Got from cardService.refreashCard of card-details.ts ");
            console.log(cardBalance);
            console.log(cardBalance._body);

            let account_Result = JSON.parse(cardBalance._body);

            console.log(account_Result.result.balance);
            console.log(account_Result.result.nonce);

            var dataBalance = Number(account_Result.result.balance) / 1000000000000000000.0;

            if (!isNaN(dataBalance))
                this.balance = dataBalance.toString();
            else
                this.balance = '';

            this.nonce = (Number(account_Result.result.nonce) + 1);
        });
    }

    sendTransaction() {
        console.log("getNebState ........ ");

        if(!this.value)  {
            alert(" Please input send NAS amount !");
            return;
          }

        // Change from NAS
        let payValue = Number(this.value) * 1000000000000000000;

        this.remoteService.sendTransaction( { 'from': this.from, 'to': this.to, 'value': payValue.toString(), 'nonce': this.nonce, 'gasPrice': this.gasPrice, 'gasLimit': this.gasLimit })
            //this.remoteService.sendTransaction({"from":"n1FF1nz6tarkDVwWQkMnnwFPuPKUaQTdptE","to":"n1MjR3J28LPYGSVNGYC8DWsM7VJaAqqPnWH", "value":"1000000000000000000","nonce":13,"gasPrice":"1000000","gasLimit":"2000000"})
            //.subscribe(
            .then(
                data => { console.log(data); this.resultAPI = data });
    }

    unlock() {
        console.log("unlock ........ " + this.from + this.password);

        if(!this.from || !this.password)  {
            alert(" Please input From Address and Password !");
            return;
          }

        // {"address":"n1FF1nz6tarkDVwWQkMnnwFPuPKUaQTdptE","passphrase":"passphrase","duration":"30000000000000"}'
        this.remoteService.unlock( {"address": this.from, "passphrase": this.password, "duration":"30000000000000"} )
            .then(
                data => {   console.log(data); 
                            this.resultAPI = data;
                            this.getAccountState(this.from);
                        } );
    }

    checkOwner() {

        console.log("check Owner ........ " + this.to);

        if(!this.to)  {
            alert(" Please input To Address!");
            return;
          }

        this.remoteService.getAccountState(this.to).then((cardBalance: PwdChangeStatusModel) => {

            let account_Result = JSON.parse(cardBalance._body);

            var dataBalance = Number(account_Result.result.balance) / 1000000000000000000.0;

            if (!isNaN(dataBalance))
                this.toBalance = dataBalance.toString();
            else
                this.toBalance = '';
        });
    }    


    onNetChange(){

        console.log(this.netType);

        switch(this.netType)
        {
            case '1':
                this.remoteService.site = 'http://localhost:8685';
                this.to = 'n1MjR3J28LPYGSVNGYC8DWsM7VJaAqqPnWH';     // Made by Ming, pw : 1
                this.password = 'passphrase';

                this.nonce = null;
                this.balance = '';
                this.toBalance = '';
            break;

            case '0':
                this.remoteService.site = 'https://testnet.nebulas.io';
                this.to = 'n1QvdfomX24brtcBrBypPDcPvt9Qwm9UBM9';
                this.from = 'n1L5AExWGCP299jB5RWmdo7t6qCRZ4MW8PW';
                this.password = 'Nas20180429';
                this.nonce = null;
                this.balance = '';
                this.toBalance = '';
            break;

            case '2':
                this.remoteService.site = 'https://mainnet.nebulas.io';
                this.to = '';
                this.from = '';
                this.password = '';
                this.nonce = null;
                this.balance = '';
                this.toBalance = '';
            break;
        }

    }
}


