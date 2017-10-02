import { Component, OnInit } from '@angular/core';

import { Util } from '../../util';

@Component({
  selector: 'app-checklist-view',
  templateUrl: './checklist-view.component.html',
  styleUrls: ['./checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  constructor(private util: Util) {}

  ngOnInit() {
    this.setNavbarTitle()
    this.setBreadcrumbs()
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Product View';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Checklists', path: '/checklist'})
    this.util.breadcrumbs.push({title: 'Checklist View', class: 'active'})
  }

}
