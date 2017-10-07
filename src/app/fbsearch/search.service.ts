import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { InitParams, LoginOptions, FacebookService } from 'ngx-facebook';
import { Http, Response } from '@angular/http';
import { Observer } from 'rxjs/Observer';
// import { ApiMethod } from 'ngx-facebook/dist/esm/providers/facebook';

@Injectable()
export class SearchService {
  public size = new Subject();
  public loggedIn = new Subject();
  searchresult: Array<any>;
  filteredresult = [];
  token = '';

  params: InitParams = {
    appId            : '152882835301244',
    xfbml            : true,
    version          : 'v2.10',
    status           : true,
    cookie           : true
  };

  options: LoginOptions = {
    scope: 'public_profile,user_friends,email,pages_show_list,publish_actions',
    return_scopes: true,
    enable_profile_selector: true
  };

  constructor(private fb: FacebookService, private http: Http) {
    this.fb.init(this.params);
  }

  checkLogin() {
    this.fb.getLoginStatus().then(
      (resp) => {
        if (resp.status === 'connected') {
          this.token = resp.authResponse.accessToken;
          this.loggedIn.next(true);
          return;
        }else {
          this.login();
        }
      }
    )
    .catch(err => console.log(err));
  }

  login() {
    this.fb.login(this.options)
    .then((res) => {
      this.token = res.authResponse.accessToken;
      this.loggedIn.next(true);
    })
    .catch(err => console.log(err));
  }

  search(name) {
    this.filteredresult =  [];
    this.http.get('https://graph.facebook.com/search?q=' + name +
     '&type=user&access_token=' + this.token + '&limit=1000')
    .subscribe((res1) => {
      const data = res1.json();
      this.searchresult = data.data;
      const regexp = new RegExp('\\b' + name + '\\b', 'i');
      let size = 0;
      for (const user of this.searchresult) {
        if (regexp.test(user.name)) {
          size++;
          this.filteredresult.push(user.name);
        }
      }
      this.size.next(size);
    },
  (err) => console.log(err));
    this.fb.logout();
  }

  getFiltResult() {
    return this.filteredresult.slice();
  }
}
