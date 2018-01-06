import { Injectable } from '@angular/core';

@Injectable()
export class Util {

  //baseURL = 'http://localhost/basic-ws/web/';
  baseURL = 'https://jgtbraga.com/web/';

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
