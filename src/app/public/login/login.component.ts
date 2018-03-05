import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Util } from '../../util'

import { AuthProvider } from './../../providers/auth/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  hasAuthError: boolean = false

  constructor(private formBuilder: FormBuilder, private util: Util, private authProvider: AuthProvider, private router: Router) {
    this.initForm()
  }

  ngOnInit() {}

  initForm() {
    this.form = this.formBuilder.group({
     email: ['succ@gmail.com', Validators.required],
     password: ['123456', Validators.required]
    })
  }

  login(data) {
    this.authProvider.login(data).subscribe(
      res => {
        localStorage.setItem('isLogged', 'true')
        this.util.setUser(res)
        this.hasAuthError = false
        this.router.navigate(['/dashboard'])
       },
      err => {},
      () => {})
  }

}
