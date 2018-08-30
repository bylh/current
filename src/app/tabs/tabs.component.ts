
import { Router } from '@angular/router';
import axios from 'axios';

import { MatSnackBar } from '@angular/material';
import { Component, AfterViewInit, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterViewInit, OnInit {

  title = '我的空间';
  userId: string;
  isLogined: boolean;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected location: Location,
    public snackBar: MatSnackBar
  ) {
  }

  public async ngAfterViewInit() {
  }

  public async ngOnInit() {
    console.log('ngOninit(): 获取订阅，可能之前订阅，也有可能是新的订阅，总之都返回订阅信息');

    // 监听推送消息
    this.appService.getSwPushMsgOb().subscribe((msg) => {
      console.log('收到消息', msg);
    });
    // 监听用户状态信息
    this.appService.getAuthStateOb().subscribe(async (user) => {
      this.isLogined = user != null; // 登录状态
      this.userId = user != null ? user.email : null; // userId即email
      console.log('用户状态： ', user);
      if (user) {
        // 导航到正确目标
        let redirect = this.appService.redirectUrl ? this.appService.redirectUrl : '/tabs/home';
        this.router.navigateByUrl(redirect);

        // console.log('用户邮箱地址是否验证', user.emailVerified);
        // if (user.emailVerified) { // 如果用户邮件被验证， 则订阅到服务器
        try {
          const pushSubscription = await this.appService.subscribeUser();
          console.log('订阅信息并保存到服务器（成功状态）：', JSON.stringify(pushSubscription));
        } catch (err) {
          console.log('ngOninit(): 订阅出错或保存到服务器出错', err);
        }
      } else {
        this.router.navigateByUrl('login');
      }
      // }
    });

    this.appService.getAuth().user.subscribe(((user) => {
      console.log('user:', user);
    }));
    this.appService.getAuth().idToken.subscribe((idToken) => {
      console.log('idToken:', idToken);
    });
    this.appService.getAuth().idTokenResult.subscribe((idTokenResult) => {
      console.log('idTokenResult:', idTokenResult);
    });
  }

  public async push() {
    console.log('push(): 测试推送');
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/send-all`,
        method: 'get'
      });
      console.log('push(): 推送消息给全部人', res);
    } catch (err) {
      console.log(err);
    }
  }
  public async test() {
    console.log('当前用户：', this.appService.getAuth().auth.currentUser);
    console.log('test(): 测试', environment);
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-tickers`,
        method: 'get'
      });
      console.log('test(): 获取行情', res);
      this.snackBar.open('测试环境');
    } catch (err) {
      console.log(err);
    }
  }

  // 登录
  public async login(email: string, pwd: string) {
    // 此时currentUser可能不存在
    if (this.appService.isLogined()) {
      this.snackBar.open('用户已登录', '关闭');
      return;
    }

    try {
      await this.appService.login(email, pwd);
      this.snackBar.open('登录成功', '关闭');
    

    } catch (err) {
      console.log('登录失败', err);
    }
  }
  public async signUp(email: string, pwd: string) {
    try {
      await this.appService.signUp(email, pwd); // 暂时注释发送邮件流程
      this.snackBar.open('注册成功', '关闭');
    } catch (err) {
      console.log('注册失败', err);
    }
  }
  public async logout() {
    try {
      await this.appService.logOut();
      this.snackBar.open('账户已登出', '关闭');
    } catch (err) {
      console.log('账户登出出错', err);
    }
  }
  public async resetPwd() {
    try {
      await this.appService.resetPwd();
      this.snackBar.open('重置密码邮箱已发送，请注意查收', '关闭');
    } catch (err) {
      console.log('重置密码出错', err);
    }
  }
  public back() {
    this.location.back();
    
  }
  public isRootTab() {
    return this.location.isCurrentPathEqualTo('/tabs/home') || this.location.isCurrentPathEqualTo('/tabs/discovery')
     || this.location.isCurrentPathEqualTo('/tabs/tools') || this.location.isCurrentPathEqualTo('/tabs/profile')
     || this.location.isCurrentPathEqualTo('/tabs');
  }
}
