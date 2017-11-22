import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ChecklistProvider } from './../../providers/checklist/checklist';

import { Util } from '../../util';

@Component({
  selector: 'app-checklist-view',
  templateUrl: './checklist-view.component.html',
  styleUrls: ['./checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  dataChecklist: any = [];

  id: string;

  constructor(private util: Util, private activatedRoute: ActivatedRoute, private checklistProvider: ChecklistProvider) {}

  ngOnInit() {
    this.checkRouteParams()
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.getChecklist()
  }

  getChecklist() {
    this.checklistProvider.view(this.id).subscribe(data => this.dataChecklist = data)
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Checklist View';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Checklists', path: '/checklist'})
    this.util.breadcrumbs.push({title: 'Checklist View', class: 'active'})
  }

}
