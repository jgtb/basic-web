import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Util } from '../../util';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  id: string;

  constructor(private activatedRoute: ActivatedRoute, private util: Util) {}

  ngOnInit() {
    this.checkRouteParams()
    this.setNavbarTitle()
    this.setBreadcrumbs()
  }

  getAction() {
      return this.id == null ? 'Create' : 'Update';
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  getTitle() {
    return this.getAction() + ' Checklist'
  }

  setNavbarTitle() {
    this.util.navbarTitle = this.getTitle();
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'});
    this.util.breadcrumbs.push({title: 'Checklists', path: '/checklist'});
    this.util.breadcrumbs.push({title: this.getTitle(), class: 'active'});
  }

}
