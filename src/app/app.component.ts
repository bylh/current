
import { SwPush } from '@angular/service-worker';
import { AngularFireAuth } from 'angularfire2/auth';
import axios from 'axios';
// import webpush from 'web-push';
import { BehaviorSubject } from 'rxjs';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
const publicKey = 'BJ3kbCc44PMG9THjY4Nc-JqYKsUkd64e-n4oFGErmuAuFfunVUK1hqrqLOHEO_L1KJQhAZgZSn4F8lUZCYhPRfk';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = '我的空间';
  protected sw: ServiceWorkerRegistration = null;
  protected pushSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    protected swPush: SwPush,
    protected appService: AppService,
    public afAuth: AngularFireAuth) {
  }

  public async ngAfterViewInit() {
  }

  public async ngOnInit() {
    console.log('ngOninit(): 获取订阅，可能之前订阅，也有可能是新的订阅，总之都返回订阅信息');

    try {
      const pushSubscription = await this.subscribeUser();
      console.log('订阅信息并保存到服务器（成功状态）：', JSON.stringify(pushSubscription));
    } catch (err) {
      console.log('ngOninit(): 订阅出错或保存到服务器出错', err);
    }

    // 监听推送消息
    this.appService.getSwPushMsgOb().subscribe((msg) => {
      console.log('收到消息', msg);
    });

    // 监听用户状态信息
    this.afAuth.authState.subscribe((user) => {
      console.log('用户状态： ', user);
      if (user) {
        console.log('用户邮箱地址是否验证', user.emailVerified);
      }
    });
    this.afAuth.user.subscribe(((user) => {
      console.log('user:', user);
    }));
    this.afAuth.idToken.subscribe((idToken) => {
      console.log('idToken:', idToken);
    });
    this.afAuth.idTokenResult.subscribe((idTokenResult) => {
      console.log('idTokenResult:', idTokenResult);
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
        url: `${environment.BaseUrl}/subscribe`,
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
        url: `${environment.BaseUrl}/send-all`,
        method: 'get'
      });
      console.log('push(): 推送消息给全部人', res);
    } catch (err) {
      console.log(err);
    }
  }

  // 登录
  public async login(email: string, pwd: string) {
    // 此时currentUser可能不存在
    if (this.afAuth.auth.currentUser != null) {
      alert('用户已登录');
      return;
    }

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
      if (!this.afAuth.auth.currentUser.emailVerified) {
        alert('请确认注册邮件后登录');
        return;
      }
      alert('登录成功');

    } catch (err) {
      console.log('登录失败', err);
    }
  }
  public async signUp(email: string, pwd: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, pwd);
      await this.afAuth.auth.currentUser.sendEmailVerification();
      alert('注册邮件已发出，请注意查收邮箱确认链接');
    } catch (err) {
      console.log('注册失败', err);
    }
  }
  public async logout() {
    try {
      await this.afAuth.auth.signOut();
      alert('账户已登出');
    } catch (err) {
      console.log('账户登出出错', err);
    }
  }
  public async resetPwd() {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(this.afAuth.auth.currentUser.email);
      alert('重置密码邮箱已发送，请注意查收');
    } catch (err) {
      console.log('重置密码出错', err);
    }
  }
}
