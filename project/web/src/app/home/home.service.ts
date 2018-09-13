import { Article } from './home.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';
import { AuthService } from '../auth.service';

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

  constructor(public auth: AuthService) {

  }

  async saveArticle(article: Article) {
    try {
      await axios.post(`${environment.BaseServerUrl}/save-html`, article);
    } catch (err) {
      throw err;
    }
  }
  async getArticles(): Promise<Array<Article>> {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/get-articles`, {
        userId: this.auth.getUserId()
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  async getArticle(articleId: string): Promise<Article> {
    try {
      let res = await axios.post(`${environment.BaseServerUrl}/get-article`, {
        userId: this.auth.getUserId(),
        articleId: articleId
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
