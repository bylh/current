
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

  constructor() { }

  async getSeg(count: number = 10) {
    try {
      const res = await axios.get(`${environment.BaseServerUrl}/get-seg`, {
        params: {
          count: count
        }
      });
      return res.data;
    } catch(err) {

    }
  }
}
