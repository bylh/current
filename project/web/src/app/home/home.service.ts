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
  html: string
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
      await this.dbService.set(res.data.article._id, article);
    } catch (err) {
      throw err;
    }
  }
  async getArticles(): Promise<Array<Article>> {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/get-articleIds`, {
        userId: this.auth.getUserId()
      });
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
      if(res != null && res.data != null) {
        await this.dbService.set(res.data._id, res.data);
      }
      
      return res.data;

    } catch (err) {
      throw err;
    }
  }
}
