import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
})
export class SecureComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  	this.checkAuth();
  }

  checkAuth() {
  	if (localStorage.getItem('isLogged') != 'true')
  		this.router.navigate(['/login']);
  }

}
