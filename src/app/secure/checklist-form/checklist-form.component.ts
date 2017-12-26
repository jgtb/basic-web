import { Component, OnInit } from '@angular/core'

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { ChecklistProvider } from './../../providers/checklist/checklist'
import { ProductProvider } from './../../providers/product/product'

import { Util } from '../../util'

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  data: FormGroup
  productTags: any = []

  dataProduct: any = []

  id: string
  query: string

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private checklistProvider: ChecklistProvider, private productProvider: ProductProvider, private util: Util, private router: Router) { }

  ngOnInit() {
    this.checkRouteParams()
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.initForm()
    this.getChecklist()
    this.getProducts()
  }

  doAction(data) {
    switch (this.getAction()) {
      case 'Create':
        this.create(data)
        break
      case 'Update':
        this.update(data)
        break
    }
  }

  create(data) {
    this.checklistProvider.create(data).subscribe(data => this.router.navigate(['/checklist']))
  }

  update(data) {
    this.checklistProvider.update(this.id, data).subscribe(data => this.router.navigate(['/checklist']))
  }

  initForm() {
    this.data = this.formBuilder.group({
      description: ['', Validators.required],
      productTags: this.formBuilder.array([])
    })
  }

  initFormValue(data) {
    this.data.controls['description'].setValue(data.description)
    for (let index in data.checklistProducts) {
      const item = {
        product_id: data.checklistProducts[index].product_id,
        description: data.checklistProducts[index].product.description,
        img: data.checklistProducts[index].product.img
      }
      this.addItem(item)
    }
  }

  addItem(item) {
    this.productTags = this.data.get('productTags') as FormArray
    this.productTags.push(this.createItem(item))
  }

  createItem(item) {
    return this.formBuilder.group({
      product_id: item.product_id,
      description: item.description,
      img: item.img
    })
  }

  removeItem(index) {
    const control = <FormArray>this.data.controls['productTags']
    control.removeAt(index)
  }

  getChecklist() {
    this.checklistProvider.view(this.id).subscribe(data => this.initFormValue(data))
  }

  getProducts() {
    this.productProvider.index().subscribe(data => this.dataProduct = data)
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id']
    })
  }

  getAction() {
    return this.id == null ? 'Create' : 'Update'
  }

  getTitle() {
    return this.getAction() + ' Checklist'
  }

  setNavbarTitle() {
    this.util.navbarTitle = this.getTitle()
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = []
    this.util.breadcrumbs.push({ title: 'Dashboard', path: '/dashboard' })
    this.util.breadcrumbs.push({ title: 'Checklists', path: '/checklist' })
    this.util.breadcrumbs.push({ title: this.getTitle(), class: 'active' })
  }

}
