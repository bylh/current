import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(updates: SwUpdate, protected swPush: SwPush) {
    // 监听推送消息
    swPush.messages.subscribe(msg => {
      console.log('收到推送消息', msg);
    });

    // 30秒检查一次更新
    interval(1000 * 30).subscribe(() => {
      updates.checkForUpdate().then(() => console.log('检查更新'))
        .catch(err => console.log('检查更新出现错误', err));
    });

    // 是否需要更新
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
  getSwPushMsgOb() {
    return this.swPush.messages;
  }
}
