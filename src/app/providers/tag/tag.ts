import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class TagProvider {

  constructor(public http: Http, public util: Util, private router: Router) {}

  index() {
    let indexURL = "tag/index?id=";
    let url = this.util.baseURL + indexURL + this.util.getUser().user_id;

    return this.http.get(url).map(res => res.json());
  }

  view(tag_id) {
    let createURL = "tag/view?id=";
    let url = this.util.baseURL + createURL + tag_id;

    return this.http.get(url).map(res => res.json());
  }

  create(data) {
    let createURL = "tag/create?id=";
    let url = this.util.baseURL + createURL + this.util.getUser().user_id;

    return this.http.post(url, data).map(res => res.json());
  }

  update(tag_id, data) {
    let updateURL = "tag/update?id=";
    let url = this.util.baseURL + updateURL + tag_id;

    return this.http.post(url, data).map(res => res.json());
  }

  delete(tag_id) {
    let deleteURL = "tag/delete?id=";
    let url = this.util.baseURL + deleteURL + tag_id;

    return this.http.get(url).map(res => res.json());
  }

}
