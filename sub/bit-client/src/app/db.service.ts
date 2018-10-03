import { Injectable } from '@angular/core';
import *as localForage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  instance: LocalForage;
  constructor() {
    this.instance = localForage.createInstance({
      name: "bylh",
      // driver: localForage.INDEXEDDB
    });
  }
  async set<T>(key: string, value: T) {
    try {
      await this.instance.setItem(key, value);
    } catch (err) {
      throw err;
    }
  }
  async get(key: string) {
    let result;
    try {
      result = await this.instance.getItem(key);
    } catch (err) {
      throw err;
    }
    return result;
  }
  async remove(key: string) {
    try {
      if (this.instance.getItem(key) == null) {
        console.log('不存在', key);
        return;
      }
      this.instance.removeItem(key);
    } catch (err) {
      throw err;
    }
  }
  async has(key: string): Promise<boolean> {
    let result;
    try {
      result = await this.get(key);
    } catch (err) {
      throw err;
    }
    return result != null;
  }
}
