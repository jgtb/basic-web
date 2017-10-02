import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductProvider } from './../../providers/product/product';

import { Util } from '../../util';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  dataProduct:any = [];

  id: string

  constructor(private util: Util, private activatedRoute: ActivatedRoute, private productProvider: ProductProvider) {}

  ngOnInit() {
    this.checkRouteParams()
    this.getProduct()
    this.setNavbarTitle()
    this.setBreadcrumbs()
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  getProduct() {
    this.productProvider.view(this.id).subscribe(data => {
      this.dataProduct = data;
    })
  }

  getProductTags() {
    let tags = this.dataProduct.productTags.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.tag.description.replace(/\s+/, '') + '</span> ';
    }, '')

    return tags;
  }

  setNavbarTitle() {
    this.util.navbarTitle = 'Product View';
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Products', path: '/product'})
    this.util.breadcrumbs.push({title: 'Product View', class: 'active'})
  }

}
