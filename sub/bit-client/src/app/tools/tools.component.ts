import { Coin } from './../../common/define';
import { ToolsService } from './tools.service';
import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import axios from '../../common/rewrite/axios';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  gateKey: string;
  gateSecret: string;
  coinName: string;
  address: string;
  displayedColumns: string[] = ['symbol', 'pair', 'rate', 'rate_percent'];
  coins: Array<Coin> = null;
  balances: any;
  constructor(public toolsService: ToolsService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }
  async getMarkerList() {
    try {
      this.coins = await this.toolsService.getMarkerList();
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateBalances() {
    try {
      this.balances = await this.toolsService.getGateBalances(this.gateKey, this.gateSecret);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateCoinAdress() {
    if (this.coinName == null) {
      this.snackBar.open('请输入代币名称');
      return;
    }
    try {
      this.address = await this.toolsService.getGateCoinAdress(this.gateKey, this.gateSecret, this.coinName);
    } catch (err) {
      console.log('err:', err);
    }
  }

}
