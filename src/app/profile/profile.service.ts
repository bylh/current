import { Profile } from './../../common/define';
import { AuthService } from './../auth.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private authService: AuthService) { }

  async getProfile(): Promise<Profile> {
    try {
      let res = await axios.get(`${environment.BaseServerUrl}/get-profile`, {
        params: {
          userId: this.authService.getUserId()
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  async updateProfile(profile: Profile) {
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/update-profile`,
        method: 'post',
        data: {
          userId: this.authService.getUserId(),
          info: profile
        }
      });
    } catch (err) {
      throw err;
    }
  }
}
