import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Util } from '../../util';

import { AuthProvider } from './../../providers/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: FormGroup;

  hasAuthError: boolean = false;

  constructor(private formBuilder: FormBuilder, private util: Util, private authProvider: AuthProvider, private router: Router) {
    this.initForm()
  }

  ngOnInit() {

  }

  initForm() {
    this.data = this.formBuilder.group({
     email: ['succ@gmail.com', Validators.required],
     password: ['123123', Validators.required]
    });
  }

  login() {
    let email = this.data.value.email;
    let password = this.data.value.password;

    let data = JSON.stringify({email: email, password: password})

    this.authProvider.login(data).subscribe(
      data => {
        if (data) {
          localStorage.setItem('isLogged', 'true')
          this.util.setUser(data)
          this.hasAuthError = false;
          this.router.navigate(['/dashboard'])
        } else {
          this.hasAuthError = true;
        }
       },
      err => {},
      () => {}
    );
  }

}
