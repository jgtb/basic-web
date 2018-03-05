import { Injectable } from '@angular/core';

@Injectable()
export class Util {

  //baseURL = 'http://localhost/basic-ws/web/';
  //baseURL = 'https://jgtbraga.com/web/';
  baseURL = 'http://localhost:3000/';

  navbarTitle: string;

  breadcrumbs: any = [];

  constructor() {}

  setUser(data) {
    localStorage.setItem('dataUser', JSON.stringify(data))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('dataUser'))
  }

}
