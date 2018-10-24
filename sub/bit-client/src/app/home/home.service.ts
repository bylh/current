import { Article } from './home.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';
import { AuthService } from '../auth.service';
import { DBService } from '../db.service';

export interface Article {
  _id?: string,
  userId: string,
  title: string,
  description: string,
  tags?: Array<string>,
  html: string,
  md?: string
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public auth: AuthService, public dbService: DBService) {
  }

  async saveArticle(article: Article) {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/save-article`, article);
      let temp = article._id != null ? article : res.data;
      console.log('保存：', res.data);
      await this.dbService.set(temp._id, temp);
    } catch (err) {
      throw err;
    }
  }
  async getArticles(): Promise<Array<Article>> {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/get-articleIds`, {
        userId: this.auth.getUserId()
      });
      // 对比缓存中的id和网络请求返回的id。本地有多余则移除
      let tempIds = await this.dbService.get('artilceIds');
      console.log('tempIds:', tempIds, 'resIds', res.data);
      if (tempIds != null) {
        tempIds.forEach(async (id) => {
          if ((res.data as Array<string>).indexOf(id) == -1) {
            console.log('移除id：', id);
            await this.dbService.remove(id);
          }
        });
      }
      this.dbService.set('artilceIds', res.data);
      let articles = [];
      for (let id of res.data) {
        articles.push(await this.getArticle(id));
      }
      return articles;
    } catch (err) {
      throw err;
    }
  }
  async getArticle(articleId: string, skipCache: boolean = false): Promise<Article> {
    try {
      let localRes;
      if (!skipCache) {
        localRes = await this.dbService.get(articleId);
      }

      if (localRes != null) {
        return localRes;
      }

      let res = await axios.post(`${environment.BaseServerUrl}/get-article`, {
        userId: this.auth.getUserId(),
        articleId: articleId
      });
      if (res != null && res.data != null) {
        await this.dbService.set(res.data._id, res.data);
      }

      return res.data;

    } catch (err) {
      throw err;
    }
  }
  async removeArticle(articleId: string) {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/remove-article`, {
        userId: this.auth.getUserId(),
        articleId: articleId
      });
      await this.dbService.remove(articleId);
    } catch (err) {
      throw err;
    }
  }
}
