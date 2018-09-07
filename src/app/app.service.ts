import axios from '../common/rewrite/axios';

import { SwUpdate, SwPush } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Defer } from '../common/utils/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(protected auth: AuthService, protected updates: SwUpdate, protected swPush: SwPush) {

    // 监听推送消息
    swPush.messages.subscribe(msg => {
      console.log('收到推送消息', msg);
    });

    // 检查更新
    updates.checkForUpdate().then(() => console.log('检查更新'))
      .catch(err => console.log('检查更新出现错误', err));

    // 可用更新订阅
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      // TODO 提示用户更新，目前只要检测到新版本直接更新
      updates.activateUpdate().then(() => document.location.reload());
    });

    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  public async subscribeUser(): Promise<string> {
    try {
      const pushSubscription = await this.swPush.requestSubscription({
        serverPublicKey: environment.Pwa.serverPublicKey
      });
      console.log('subscribeUser(): 订阅成功');
      // 订阅成功将信息保存到服务器
      await axios.request({
        url: `${environment.BaseServerUrl}/subscribe`,
        method: 'post',
        params: {
          userId: this.auth.getAuthSubject().getValue,
          pushSubscription: JSON.stringify(pushSubscription)
        },
      });
      console.log('subscribeUser(): 订阅信息保存到服务器成功');
      return JSON.stringify(pushSubscription);
    } catch (err) {
      throw err;
    }
  }

  // 获取推送消息ob
  getSwPushMsgOb() {
    return this.swPush.messages;
  }
}