import { Component, OnInit } from '@angular/core';
import { GithubService } from '../shared/github-service.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  protected user: Array<any>;
  protected repos: Array<any>;
  protected username: string;

  constructor(private _githubService: GithubService) {

    this.user = null;
  }

  ngOnInit() {
  }

  protected searchUser() {

    console.log ('user name is : ' + this.username);
    this._githubService.updateUser(this.username);

    this._githubService.getUser().subscribe(user => {
      this.user = user;
    });

    this._githubService.getRepos().subscribe(repos => {
      this.repos = repos;
    });
  }
}
