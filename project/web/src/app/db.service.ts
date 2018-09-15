import { Injectable } from '@angular/core';
import *as localForage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor() { 
  }
  async set<T>(key: string, value: T) {
    await localForage.setItem(key,value);
  }
  async get(key: string, skipCache: boolean = false) {
    return await localForage.getItem(key);
  }
  async remove(key: string) {
    if(localForage.getItem(key) == null) {
      console.log('不存在', key);
      return;
    }
    localForage.removeItem(key);
  }
}
