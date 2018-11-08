import { Coin } from './../../common/define';
import { ToolsService } from './tools.service';

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import io from 'socket.io-client';


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
    let roomid = '100';
    let userInfo = {
      username: 'bylh'
    }
    if (roomid != null && roomid != '') {
      const socket = io.connect('http://127.0.0.1:6001?roomid=' + roomid);
      /*连接完毕，马上发送一个'join'事件，把自己的用户名告诉别人*/
      socket.emit('join', {
        username: userInfo.username
      });
  
      socket.on('message', function(msg) {
        switch (msg.event) {
          case 'join':
            if (msg.data.username) {
              console.log(msg.data.username + '加入了聊天室');
              let data = {
                text: msg.data.username + '加入了聊天室'
              };
              // showNotice(data);
            }
            break;
          case 'broadcast_say':
            if (msg.data.username !== userInfo.username) {
              console.log(msg.data.username + '说: ' + msg.data.text);
              // showMessage(msg.data);
            }
            break;
          case 'broadcast_quit':
            if (msg.data.username) {
              console.log(msg.data.username + '离开了聊天室');
              let data = {
                text: msg.data.username + '离开了聊天室'
              };
              // showNotice(data);
            }
            break;
        }
      })
  
    }
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
