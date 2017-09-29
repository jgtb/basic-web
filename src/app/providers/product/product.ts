import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class ProductProvider {

  constructor(public http: Http, public util: Util, private router: Router) {}

  index() {
    let indexURL = "product/index?id=";
    let url = this.util.baseURL + indexURL + this.util.getUser().user_id;

    return this.http.get(url).map(res => res.json());
  }

  view(product_id) {
    let createURL = "product/view?id=";
    let url = this.util.baseURL + createURL + product_id;

    return this.http.get(url).map(res => res.json());
  }

  create(data) {
    let createURL = "product/create?id=";
    let url = this.util.baseURL + createURL + this.util.getUser().user_id;

    return this.http.post(url, data).map(res => res.json());
  }

  update(product_id, data) {
    let updateURL = "product/update?id=";
    let url = this.util.baseURL + updateURL + product_id;

    return this.http.post(url, data).map(res => res.json());
  }

  delete(product_id) {
    let deleteURL = "product/delete?id=";
    let url = this.util.baseURL + deleteURL + product_id;

    return this.http.get(url).map(res => res.json());
  }

}
