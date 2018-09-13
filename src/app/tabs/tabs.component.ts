
import { Router } from '@angular/router';
import axios from '../../common/rewrite/axios';

import { MatSnackBar } from '@angular/material';
import { Component, AfterViewInit, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterViewInit, OnInit {

  title = '我的空间';
  userId: string;
  avatarUrl: string;
  constructor(
    protected appService: AppService,
    public auth: AuthService,
    protected router: Router,
    protected location: Location,
    public snackBar: MatSnackBar
  ) {
    this.auth.getAuthSubject().subscribe( async(userId) => {
      this.userId = userId;
      this.avatarUrl = `${environment.BaseServerUrl}/avatars/${userId}-avatar.jpg`;
      if(userId != null) {
        try {
          const pushSubscription = await this.appService.subscribeUser();
          console.log('订阅信息并保存到服务器（成功状态）：', JSON.stringify(pushSubscription));
        } catch (err) {
          console.log('ngOninit(): 订阅出错或保存到服务器出错', err);
        }
      }
    });
  }

  public async ngAfterViewInit() {
  }

  public async ngOnInit() {

    try {
      let logined = await this.auth.isLogined();
      console.log('是否登录', logined);
    } catch(err) {
      console.log('检查是否登录出错', err);
    }
    console.log('ngOninit(): 获取订阅，可能之前订阅，也有可能是新的订阅，总之都返回订阅信息');

    // 监听推送消息
    this.appService.getSwPushMsgOb().subscribe((msg) => {
      console.log('收到消息', msg);
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
  public async toProfile() {
    this.router.navigate(['tabs/profile']);
  }
  
  public async logout() {
    try {
      await this.auth.logOut();
      this.snackBar.open('账户已登出', '关闭');
    } catch (err) {
      console.log('账户登出出错', err);
    }
  }
  
  public back() {
    this.location.back();

  }
}
