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

  dataCategory: any = [];

  query: string = '';

  private timerSubscription: AnonymousSubscription;
  private categoriesSubscription: AnonymousSubscription;

  constructor(private categoryProvider: CategoryProvider, private util: Util, private router: Router) {
  }

  ngOnInit() {
    this.setTitle();
    this.categoryProvider.index().subscribe(data => {
      this.dataCategory = data;
      this.refreshData();
    });
  }

  public ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  delete(id) {
    this.categoryProvider.delete(id).subscribe(data => {
      this.categoryProvider.index().subscribe(data => {
        this.dataCategory = data;
      })
    })
  }

  private refreshData(): void {
    this.categoriesSubscription = this.categoryProvider.index().subscribe(data => {
      this.dataCategory = data;
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(500).subscribe(() => this.refreshData());
  }

  setTitle() {
    this.util.navbarTitle = 'Categories';
  }

}
