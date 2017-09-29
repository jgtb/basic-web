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

  constructor(private util: Util, private activatedRoute: ActivatedRoute, private productProvider: ProductProvider) {
    this.checkRouteParams();
    this.productProvider.view(this.id).subscribe(data => {
      this.dataProduct = data;
    })
    this.setTitle();
  }

  ngOnInit() {
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  getProductTags() {
    let tags = this.dataProduct.productTags.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.tag.description.replace(/\s+/, '') + '</span> ';
    }, '')

    return tags.substr(0, tags.length -2);
  }

  setTitle() {
    this.util.navbarTitle = 'Product View';
  }

}
