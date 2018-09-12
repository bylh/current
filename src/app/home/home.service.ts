import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() {

  }

  async saveHtml(userId: string, html: string) {
    try {
      await axios.post(`${environment.BaseServerUrl}/save-html`, {
        userId,
        html
      });
    } catch (err) {
      throw err;
    }
  }

}
