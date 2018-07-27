import { RequestOptions } from '@angular/http';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import urlb64touint8array from 'urlb64touint8array';
import axios from 'axios';
// import webpush from 'web-push';
import { BehaviorSubject } from 'rxjs';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { identifierModuleUrl } from '../../node_modules/@angular/compiler';
// import * as Pwa from '@angular/pwa';
const publicKey = 'BJ3kbCc44PMG9THjY4Nc-JqYKsUkd64e-n4oFGErmuAuFfunVUK1hqrqLOHEO_L1KJQhAZgZSn4F8lUZCYhPRfk';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'app';
  protected sw: ServiceWorkerRegistration = null;
  protected pushSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(protected swPush: SwPush) {
    // swPush.messages.subscribe(msg => console.log('收到消息', msg));
  }
  public async ngAfterViewInit() {
    self.addEventListener('push', (event: any) => {
      // const notificationData = event.data.json();
      // const title = notificationData.title;
      // 可以发个消息通知页面
      // util.postMessage(notificationData);
      // 弹消息框
      console.log('收到消息', event);
      event.waitUntil((self as any).registration.showNotification('收到通知', {
        body: 'Buzz! Buzz!',
        tag: 'vibration-sample'
      }));

    });
  }
  public async ngOnInit() {
    console.log('ngOninit');
    //   if ('serviceWorker' in navigator) {
    //     this.sw = await navigator.serviceWorker.getRegistration('/ngsw-worker.js');
    //     if (this.sw == null) {
    //       this.sw = await navigator.serviceWorker.register('/ngsw-worker.js');

    //     }
    //     console.log('是否存在sw', this.sw);
    //   // }
    //   // if ('PushManager' in window) {
    //   //   const subscription = await this.sw.pushManager.getSubscription();
    //   //   console.log('用户订阅的数据：', JSON.stringify(subscription));
    //   //   if (subscription == null) {
    //   //     console.log('订阅开始');
    //   //     await this.subscribeUser(this.sw);
    //   //     console.log('订阅成功');
    //   //   } else {
    //   //     console.log('you have subscribed');
    //   //   }
    //   // }
    // }
    console.log('订阅开始');
    const pushSubscription = await this.swPush.requestSubscription({
      serverPublicKey: publicKey
    });
    console.log('订阅成功了3：', JSON.stringify(pushSubscription));
    await axios.request({
      url: 'https://bit.bylh.top/subscribe',
      method: 'post',
      params: {
        publicKey: publicKey,
        pushSubscription: JSON.stringify(pushSubscription)
      },
    });
    console.log('消息处理', this.swPush);
    this.swPush.messages.subscribe(msg => {
      console.log('收到消息', msg);
    });
  }


  public async subscribeUser(swRegistration) {
    // const vapidKeys = webpush.generateVAPIDKeys();
    // console.log(vapidKeys.publicKey, vapidKeys.privateKey);
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlb64touint8array(publicKey)
    });
    if (subscription == null) {
      return;
    }
    // this.updateSubscriptionOnServer(subscription);
  }
  public updateSubscriptionOnServer(subscription) {
    const url = 'https://node-web-push-app.azurewebsites.net/subscribe';

    if (subscription) {
      const subscriptionJson = JSON.stringify(subscription);
      const fetchOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: subscriptionJson };
      fetch(url, fetchOptions)
        .then(data => console.log('Push subscription request succeeded with JSON response', data))
        .catch(error => console.log('Push subscription request failed', error));
    }
  }
  public async push() {
    console.log('测试推送');
    try {
      const res = await axios.request({
        url: 'https://bit.bylh.top/send-all',
        method: 'get',

        // params: {
        //   market_code: 'ocxeth'
        // },

      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
