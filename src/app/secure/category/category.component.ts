import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoryProvider } from './../../providers/category/category';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import 'rxjs/Rx';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  data;
  query = "";
  rowsOnPage = 10;
  sortBy = "description";
  sortOrder = "asc";

  timerSubscription: AnonymousSubscription;
  categoriesSubscription: AnonymousSubscription;

  constructor(private categoryProvider: CategoryProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.getCategories()
  }

  ngOnDestroy() {
    if (this.categoriesSubscription)
      this.categoriesSubscription.unsubscribe()

    if (this.timerSubscription)
      this.timerSubscription.unsubscribe()
  }

  getCategories() {
    this.categoryProvider.index().subscribe(data => {
      this.data = data;
      this.refreshData()
    })
  }

  delete(id) {
    this.categoryProvider.delete(id).subscribe(data => {
      this.categoryProvider.index().subscribe(data => {
        this.data = data;
      })
    })
  }

  refreshData() {
    this.categoriesSubscription = this.categoryProvider.index().subscribe(data => {
      this.data = data;
      this.subscribeToData()
    })
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).subscribe(() => this.refreshData())
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Categories';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Categories', class: 'active'})
  }

}
