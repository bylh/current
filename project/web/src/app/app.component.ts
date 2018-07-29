
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import urlb64touint8array from 'urlb64touint8array';
import axios from 'axios';
// import webpush from 'web-push';
import { BehaviorSubject } from 'rxjs';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import Config from '../config';
// import * as Pwa from '@angular/pwa';
const publicKey = 'BJ3kbCc44PMG9THjY4Nc-JqYKsUkd64e-n4oFGErmuAuFfunVUK1hqrqLOHEO_L1KJQhAZgZSn4F8lUZCYhPRfk';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = '看世界';
  protected sw: ServiceWorkerRegistration = null;
  protected pushSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(protected swPush: SwPush) {
  }

  public async ngAfterViewInit() {
      // 监听推送消息
      this.swPush.messages.subscribe(msg => {
        console.log('收到推送消息', msg);
      });
  }

  public async ngOnInit() {
    console.log('ngOninit(): 获取订阅，可能之前订阅，也有可能是新的订阅，总之都返回订阅信息');

    try {
      const pushSubscription = await this.subscribeUser();
      console.log('订阅信息并保存到服务器（成功状态）：', JSON.stringify(pushSubscription));
    } catch (err) {
      console.log('ngOninit(): 订阅出错或保存到服务器出错', err);
    }
  }


  public async subscribeUser(): Promise<string> {
    try {
      const pushSubscription = await this.swPush.requestSubscription({
        serverPublicKey: publicKey
      });
      console.log('subscribeUser(): 订阅成功');
      // 订阅成功将信息保存到服务器
      await axios.request({
        url: `${Config.BaseUrl}/subscribe`,
        method: 'post',
        params: {
          publicKey: publicKey,
          pushSubscription: JSON.stringify(pushSubscription)
        },
      });
      console.log('subscribeUser(): 订阅信息保存到服务器成功');
      return JSON.stringify(pushSubscription);
    } catch (err) {
      throw err;
    }
  }
  public async push() {
    console.log('push(): 测试推送');
    try {
      const res = await axios.request({
        url: `${Config.BaseUrl}/send-all`,
        method: 'get'
      });
      console.log('push(): 推送消息给全部人', res);
    } catch (err) {
      console.log(err);
    }
  }
}
