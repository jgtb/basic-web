import { Component, OnInit } from '@angular/core';

import { ProductProvider } from './../../providers/product/product';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataProduct: any = [];

  query: string = '';

  constructor(private productProvider: ProductProvider, private util: Util, private router: Router) {
  }

  ngOnInit() {
    this.setTitle();
    this.productProvider.index().subscribe(data => { this.dataProduct = data; });
  }

  delete(id) {
    this.productProvider.delete(id).subscribe(data => { this.productProvider.index().subscribe(data => { this.dataProduct = data; }); })
  }

  getProductTags(item) {
    let tags = item.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.tag.description.replace(/\s+/, '') + '</span> ';
    }, '')

    return tags.substr(0, tags.length -2);
  }

  setTitle() {
    this.util.navbarTitle = 'Products';
  }

}
