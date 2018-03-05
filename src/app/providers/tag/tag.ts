import { Injectable } from '@angular/core'

import { Router } from '@angular/router'

import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'

import { Util } from '../../util'

@Injectable()
export class TagProvider {

  _headers: any = {}

  constructor(public http: Http, public util: Util, private router: Router) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    this._headers = {headers: headers}
  }

  index() {
    let indexURL = 'tag/index'
    let url = this.util.baseURL + indexURL

    console.log(this._headers);

    return this.http.get(url, this._headers).map(res => res.json())
  }

  view(tag_id) {
    let createURL = 'tag/view/'
    let url = this.util.baseURL + createURL + tag_id

    return this.http.get(url, this._headers).map(res => res.json())
  }

  create(data) {
    let createURL = 'tag/create'
    let url = this.util.baseURL + createURL

    return this.http.post(url, data, this._headers).map(res => res.json())
  }

  update(tag_id, data) {
    let updateURL = 'tag/update/'
    let url = this.util.baseURL + updateURL + tag_id

    return this.http.put(url, data, this._headers).map(res => res.json())
  }

  delete(tag_id) {
    let deleteURL = 'tag/delete/'
    let url = this.util.baseURL + deleteURL + tag_id

    return this.http.delete(url, this._headers).map(res => res.json())
  }

}
