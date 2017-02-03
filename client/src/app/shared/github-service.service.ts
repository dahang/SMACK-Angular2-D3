import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from '@reactivex/rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class GithubService {
  private username: string;
  private client_id = 'fe9ac5eb3f21240ac5cf';
  private client_secret = 'dce9dccb1ee8058b81f2f56a4f17fa77905e49f0';

  constructor(private _http: Http) {
    this.username = 'dahang';
  }

  getUser() {
    return this._http.get(
      'http://api.github.com/users/' + this.username + '?client_id=' + this.client_id + '&client_secret=' + this.client_secret)
      .map(res => res.json());
  }

  getRepos() {
    return this._http.get(
      'http://api.github.com/users/' + this.username + '/repos?client_id=' + this.client_id + '&client_secret=' + this.client_secret)
      .map(res => res.json());
  }

  updateUser(username: string) {
    this.username = username;
  }

}
