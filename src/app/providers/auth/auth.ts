import { Injectable } from '@angular/core'

import { Router } from '@angular/router'

import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

import { Util } from '../../util'

@Injectable()
export class AuthProvider {

  constructor(public http: Http, public util: Util, private router: Router) {}

  login(data) {
    let loginURL = "auth/login"
    let url = this.util.baseURL + loginURL

    return this.http.post(url, data).map(res => res.json())
  }

  logout() {
    localStorage.setItem('isLogged', 'false')
    this.util.setUser([])
    this.router.navigate(['/login'])
  }

  register(data) {
    let registerURL = "auth/register"
    let url = this.util.baseURL + registerURL

    return this.http.post(url, data).map(res => res.json())
  }

  forgotPassword(data) {
    let forgotPasswordURL = "auth/forgot-password"
    let url = this.util.baseURL + forgotPasswordURL

    return this.http.post(url, data).map(res => res.json())
  }

}
