import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
})
export class PublicComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  	this.setBackgroundColor();
  	this.checkAuth();
  }

  setBackgroundColor() {
  	var body = document.getElementsByTagName('body')[0];
  	body.classList.add('public-page');
  }

  checkAuth() {
  	if (localStorage.getItem('isLogged') === 'true')
  		this.router.navigate(['/dashboard']);
  }

}
