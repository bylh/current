import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SwUpdate, SwPush } from '@angular/service-worker';
import axios from 'axios';
import { AngularFireAuth } from 'angularfire2/auth';

const publicKey = 'BJ3kbCc44PMG9THjY4Nc-JqYKsUkd64e-n4oFGErmuAuFfunVUK1hqrqLOHEO_L1KJQhAZgZSn4F8lUZCYhPRfk';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(protected updates: SwUpdate, protected swPush: SwPush, protected afAuth: AngularFireAuth) {
    // 监听推送消息
    swPush.messages.subscribe(msg => {
      console.log('收到推送消息', msg);
    });

    // 使用interval(1000 * 30).subscribe更新，不动
    updates.checkForUpdate().then(() => console.log('检查更新'))
      .catch(err => console.log('检查更新出现错误', err));

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

  public async subscribeUser(): Promise<string> {
    try {
      const pushSubscription = await this.swPush.requestSubscription({
        serverPublicKey: publicKey
      });
      console.log('subscribeUser(): 订阅成功');
      // 订阅成功将信息保存到服务器
      await axios.request({
        url: `${environment.BaseServerUrl}/subscribe`,
        method: 'post',
        params: {
          userId: this.afAuth.auth.currentUser.email,
          pushSubscription: JSON.stringify(pushSubscription)
        },
      });
      console.log('subscribeUser(): 订阅信息保存到服务器成功');
      return JSON.stringify(pushSubscription);
    } catch (err) {
      throw err;
    }
  }

  getSwPushMsgOb() {
    return this.swPush.messages;
  }
  getAuth() {
    return this.afAuth;
  }


  isLogined(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

  // 获取用户状态ob
  getAuthStateOb() {
    return this.afAuth.authState;
  }

  // 登录
  async login(email: string, pwd: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
    } catch (err) {
      throw err;
    }
  }

  // 注册
  async signUp(email: string, pwd: string) { // 暂时不发送注册邮箱
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, pwd); // 邮箱密码创建账户
      // await this.afAuth.auth.currentUser.sendEmailVerification(); // 发送用户验证邮箱
      await axios.request({
        url: `${environment.BaseServerUrl}/sign-up`,
        params: {
          userId: email,
          pwd: pwd
        }
      });
    } catch (err) {
      throw err;
    }
  }
  async logOut() {
    try {
      await this.afAuth.auth.signOut();
    } catch (err) {
      throw err;
    }
  }
  public async resetPwd() {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(this.afAuth.auth.currentUser.email);
    } catch (err) {
      throw err;
    }
  }
}