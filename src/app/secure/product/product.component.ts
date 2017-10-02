import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductProvider } from './../../providers/product/product';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  data;
  query = "";
  rowsOnPage = 10;
  sortBy = "description";
  sortOrder = "asc";

  timerSubscription: AnonymousSubscription;
  productsSubscription: AnonymousSubscription;

  constructor(private productProvider: ProductProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.getCategories()
  }

  ngOnDestroy() {
    if (this.productsSubscription)
      this.productsSubscription.unsubscribe()

    if (this.timerSubscription)
      this.timerSubscription.unsubscribe()
  }

  getCategories() {
    this.productProvider.index().subscribe(data => {
      this.data = data;
      this.refreshData()
    })
  }

  getProductTags(item) {
    let tags = item.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.tag.description + '</span> ';
    }, '')

    return tags;
  }

  delete(id) {
    this.productProvider.delete(id).subscribe(data => {
      this.productProvider.index().subscribe(data => {
        this.data = data;
      })
    })
  }

  refreshData() {
    this.productsSubscription = this.productProvider.index().subscribe(data => {
      this.data = data;
      this.subscribeToData()
    })
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).subscribe(() => this.refreshData())
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Products';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Products', class: 'active'})
  }

}
