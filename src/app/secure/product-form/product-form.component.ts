import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('fileInput') fileInput: ElementRef;

  dataCategory: any = [];
  dataTag: any = [];
  productTags: any = [];

  data: FormGroup;

  id: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private productProvider: ProductProvider, private tagProvider: TagProvider, private categoryProvider: CategoryProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.initForm()
    this.checkRouteParams()
    this.getAction()
    this.getProduct()
    this.getData()
    this.setNavbarTitle()
    this.setBreadcrumbs()
  }

  getAction() {
    return this.id == null ? 'Create' : 'Update';
  }

  doAction(data) {
    switch(this.getAction()) {
      case 'Create':
        this.create(data);
      break;
      case 'Update':
        this.update(data);
      break;
    }
  }

  getData() {
    this.dataCategory = this.categoryProvider.index().subscribe(data => { this.dataCategory = data })
    this.dataTag = this.tagProvider.index().subscribe(data => { this.dataTag = data })
  }

  getProduct() {
    this.productProvider.view(this.id).subscribe(data => {
      this.setProductTags(data)
      this.initFormValue(data)
    })
  }

  create(data) {
    data.img = this.convertToUpload(data.img);
    this.productProvider.create(data).subscribe(data => this.router.navigate(['/product']))
  }

  update(data) {
    data.img = this.convertToUpload(data.img);
    this.productProvider.update(this.id, data).subscribe(data => this.router.navigate(['/product']))
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe(params => this.id = params['id'])
  }

  initForm() {
    this.data = this.formBuilder.group({
     description: ['', Validators.required],
     productTags: ['', Validators.required],
     category_id: ['', Validators.required],
     quantity: ['', Validators.required],
     price: ['', Validators.required],
     img: ['']
    });
  }

  initFormValue(data) {
    this.data.controls['description'].setValue(data.description)
    this.data.controls['productTags'].setValue(this.productTags)
    this.data.controls['category_id'].setValue(data.category_id)
    this.data.controls['quantity'].setValue(data.quantity)
    this.data.controls['price'].setValue(data.price)
    this.data.controls['img'].setValue(this.util.baseURL + 'img/product/' + data.img)
  }

  onFileChange(event) {
    this.convertToBase64(event.target);
  }

  convertToBase64(inputValue) {
    const file: File = inputValue.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.data.controls['img'].setValue(fileReader.result)
    }

    fileReader.readAsDataURL(file);
  }

  convertToUpload(img) {

  }

  setProductTags(data) {
    if (this.getAction() === 'Update')
      data.productTags.map(obj => this.productTags.push(obj.tag_id))
  }

  getTitle() {
    return this.getAction() + ' Product';
  }

  setNavbarTitle() {
    this.util.navbarTitle = this.getTitle()
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'})
    this.util.breadcrumbs.push({title: 'Products', path: '/product'})
    this.util.breadcrumbs.push({title: this.getTitle(), class: 'active'})
  }

}
