import { Component, OnInit, OnDestroy } from '@angular/core';

import { TagProvider } from './../../providers/tag/tag';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import 'rxjs/Rx';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {

  data;
  query = "";
  rowsOnPage = 10;
  sortBy = "description";
  sortOrder = "asc";

  timerSubscription: AnonymousSubscription;
  tagsSubscription: AnonymousSubscription;

  constructor(private tagProvider: TagProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.getTags()
  }

  ngOnDestroy() {
    if (this.tagsSubscription)
      this.tagsSubscription.unsubscribe()

    if (this.timerSubscription)
      this.timerSubscription.unsubscribe()
  }

  getTags() {
    this.tagProvider.index().subscribe(data => {
      this.data = data;
      this.refreshData()
    })
  }

  delete(id) {
    this.tagProvider.delete(id).subscribe(data => {
      this.tagProvider.index().subscribe(data => {
        this.data = data;
      })
    })
  }

  refreshData() {
    this.tagsSubscription = this.tagProvider.index().subscribe(data => {
      this.data = data;
      this.subscribeToData()
    })
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).subscribe(() => this.refreshData())
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Tags';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Tags', class: 'active'})
  }

}
