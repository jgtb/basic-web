import { Component, OnInit, OnDestroy } from '@angular/core'

import { ChecklistProvider } from './../../providers/checklist/checklist'

import { Util } from '../../util'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { Observable } from "rxjs/Observable"
import { AnonymousSubscription } from "rxjs/Subscription"
import 'rxjs/Rx'

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit, OnDestroy {

  data
  query = ''
  rowsOnPage = 10
  sortBy = 'description'
  sortOrder = 'asc'

  timerSubscription: AnonymousSubscription;
  checklistsSubscription: AnonymousSubscription;

  constructor(private checklistProvider: ChecklistProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.getChecklists()
  }

  ngOnDestroy() {
    if (this.checklistsSubscription)
      this.checklistsSubscription.unsubscribe()

    if (this.timerSubscription)
      this.timerSubscription.unsubscribe()
  }

  getChecklistProducts(item) {
    let tags = item.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.product.description + '</span> '
    }, '')

    return tags
  }

  delete(id) {
    this.checklistProvider.delete(id).subscribe(data => {
      this.getChecklists()
    })
  }

  getChecklists() {
    this.checklistsSubscription = this.checklistProvider.index().subscribe(data => {
      this.data = data;
      this.subscribeToData()
    })
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).subscribe(() => this.getChecklists())
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Checklists'
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Checklists', class: 'active'})
  }

}
