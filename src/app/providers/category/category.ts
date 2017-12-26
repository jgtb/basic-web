import { Injectable } from '@angular/core'

import { Router } from '@angular/router'

import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

import { Util } from '../../util'

@Injectable()
export class CategoryProvider {

  constructor(public http: Http, public util: Util, private router: Router) {}

  index() {
    let indexURL = "category/index?id="
    let url = this.util.baseURL + indexURL + this.util.getUser().user_id

    return this.http.get(url).map(res => res.json())
  }

  view(category_id) {
    let createURL = "category/view?id="
    let url = this.util.baseURL + createURL + category_id

    return this.http.get(url).map(res => res.json())
  }

  create(data) {
    let createURL = "category/create?id="
    let url = this.util.baseURL + createURL + this.util.getUser().user_id

    return this.http.post(url, data).map(res => res.json())
  }

  update(category_id, data) {
    let updateURL = "category/update?id="
    let url = this.util.baseURL + updateURL + category_id

    return this.http.post(url, data).map(res => res.json())
  }

  delete(category_id) {
    let deleteURL = "category/delete?id="
    let url = this.util.baseURL + deleteURL + category_id

    return this.http.get(url).map(res => res.json());
  }

}
