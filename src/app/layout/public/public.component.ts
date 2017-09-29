import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
})
export class PublicComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  	var body = document.getElementsByTagName('body')[0];
  	body.classList.add('public-page');
  }

}
