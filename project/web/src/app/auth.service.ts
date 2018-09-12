import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Defer } from '../common/utils/utils';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'js-cookie';
import axios from '../common/rewrite/axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  authSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor() {
    console.log('connect.sid:',  Cookies.get('connect.sid', { domain: 'localhost' }));
    this.isLogined().then((value) => {
      console.log('登录状态：', value);
    }).catch();
  }

  getAuthSubject() {
    return this.authSubject
  }
  getUserId() {
    return this.authSubject.getValue();
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
  public async resetPwd(orgPwd: string, newPwd: string) {
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/reset-pwd`,
        method: 'post',
        data: {
          orgPwd,
          newPwd,
        }
      });
      await this.logOut();
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
      console.log('是否登录', res, res.data.userId);
      this.authSubject.next(res.data.userId);
      if(res.data.userId == null) {
        return false;
      }
      return true;
    } catch (err) {
      this.authSubject.next(null);
      return false;
    }
  }
}
