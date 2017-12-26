import { Injectable } from '@angular/core'

import { Router } from '@angular/router'

import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

import { Util } from '../../util'

@Injectable()
export class ChecklistProvider {

  constructor(public http: Http, public util: Util, private router: Router) {}

  index() {
    let indexURL = "checklist/index?id="
    let url = this.util.baseURL + indexURL + this.util.getUser().user_id

    return this.http.get(url).map(res => res.json())
  }

  view(checklist_id) {
    let createURL = "checklist/view?id="
    let url = this.util.baseURL + createURL + checklist_id

    return this.http.get(url).map(res => res.json())
  }

  create(data) {
    let createURL = "checklist/create?id="
    let url = this.util.baseURL + createURL + this.util.getUser().user_id

    return this.http.post(url, data).map(res => res.json())
  }

  update(checklist_id, data) {
    let updateURL = "checklist/update?id="
    let url = this.util.baseURL + updateURL + checklist_id

    return this.http.post(url, data).map(res => res.json());
  }

  delete(checklist_id) {
    let deleteURL = "checklist/delete?id="
    let url = this.util.baseURL + deleteURL + checklist_id

    return this.http.get(url).map(res => res.json());
  }

}
