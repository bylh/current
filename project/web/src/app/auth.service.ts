import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Defer } from '../utils/utils';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true    // 请求携带cookie信息

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  authSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor() {
    console.log('connect.sid:',  Cookies.get('connect.sid', { domain: 'localhost' }));
    this.isLogined().then(() => {
      console.log('hello');
    })
  }
  async ngOnInit() {
    console.log('dsadasfafasfasfa');
    await this.isLogined()
  }

  getAuthSubject() {
    return this.authSubject
  }

  // 登录
  async login(email: string, pwd: string) {
    try {
      let res = await axios.request({
        url: `${environment.BaseServerUrl}/login`,
        method: 'post',
        data: {
          userId: email,
          pwd: pwd
        }
      });
      this.authSubject.next(email);
    } catch (err) {
      throw err;
    }
  }

  // 注册
  async signUp(email: string, pwd: string) { // 暂时不发送注册邮箱
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/sign-up`,
        method: 'post',
        data: {
          userId: email,
          pwd: pwd
        }
      });
      this.authSubject.next(email);
    } catch (err) {
      throw err;
    }
  }

  // 登出
  async logOut() {
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/logout`,
        method: 'post',
        data: {
          userId: this.authSubject.getValue(),
        }
      });
      this.authSubject.next(null);
    } catch (err) {
      throw err;
    }
  }

  // 重置密码
  public async resetPwd() {
    try {
    } catch (err) {
      throw err;
    }
  }

  // 用户是否登录
  async isLogined(): Promise<boolean> {
    // if (Cookies.get('connect.sid') == null) {
    //   return false;
    // }
    try {
      let res = await axios.request({
        url: `${environment.BaseServerUrl}/check-session`,
        method: 'post',
      });
      console.log('是否登录', res, res.data);
      this.authSubject.next(res.data.userId);
      return true;
    } catch (err) {
      this.authSubject.next(null);
      return false;
    }
  }
}
