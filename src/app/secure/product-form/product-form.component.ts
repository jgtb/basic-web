import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductProvider } from './../../providers/product/product';
import { CategoryProvider } from './../../providers/category/category';
import { TagProvider } from './../../providers/tag/tag';

import { Util } from '../../util';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  dataCategory: any = [];
  dataTag: any = [];
  productTags: any = [];

  data: FormGroup;

  id: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private productProvider: ProductProvider, private tagProvider: TagProvider, private categoryProvider: CategoryProvider, private util: Util, private router: Router) {
    this.initForm();
    this.checkRouteParams();
    this.getAction();
    this.productProvider.view(this.id).subscribe(data => {
      this.setProductTags(data)
      this.initFormValue(data)
    })
    this.setTitle();
  }

  ngOnInit() {
    this.dataCategory = this.categoryProvider.index().subscribe(data => { this.dataCategory = data })
    this.dataTag = this.tagProvider.index().subscribe(data => { this.dataTag = data })
  }

  getAction() {
    return this.id == null ? 'Create' : 'Update';
  }

  doAction() {
    switch(this.getAction()) {
      case 'Create':
        this.create();
      break;
      case 'Update':
        this.update();
      break;
    }
  }

  create() {
    let category_id = this.data.value.category_id;
    let productTags = this.data.value.productTags;
    let description = this.data.value.description;
    let quantity = this.data.value.quantity;
    let price = this.data.value.price;

    let data = JSON.stringify({category_id: category_id, productTags: productTags, description: description, quantity: quantity, price: price, img: "3.png"})

    this.productProvider.create(data).subscribe(data => this.router.navigate(['/product']))
  }

  update() {
    let category_id = this.data.value.category_id;
    let productTags = this.data.value.productTags;
    let description = this.data.value.description;
    let quantity = this.data.value.quantity;
    let price = this.data.value.price;

    let data = JSON.stringify({category_id: category_id, productTags: productTags, description: description, quantity: quantity, price: price, img: "3.png"})

    this.productProvider.update(this.id, data).subscribe(data => this.router.navigate(['/product']))
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  initForm() {
    this.data = this.formBuilder.group({
     description: ['', Validators.required],
     productTags: ['', Validators.required],
     category_id: ['', Validators.required],
     quantity: ['', Validators.required],
     price: ['', Validators.required],
    });
  }

  initFormValue(data) {
    this.data.controls['description'].setValue(data.description);
    this.data.controls['productTags'].setValue(this.productTags);
    this.data.controls['category_id'].setValue(data.category_id);
    this.data.controls['quantity'].setValue(data.quantity);
    this.data.controls['price'].setValue(data.price);
  }

  setProductTags(data) {
    data.productTags.map(obj => this.productTags.push(obj.tag_id));
  }

  setTitle() {
    this.util.navbarTitle = this.getAction() + ' Product';
  }

}
