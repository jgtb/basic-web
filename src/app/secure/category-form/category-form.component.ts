import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoryProvider } from './../../providers/category/category';

import { Util } from '../../util';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  data: FormGroup;

  id: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private categoryProvider: CategoryProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.checkRouteParams()
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.initForm()
    if (this.getAction() === 'Update')
      this.getCategory()
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

  getCategory() {
    this.categoryProvider.view(this.id).subscribe(data => { this.initFormValue(data) })
  }

  create(data) {
    this.categoryProvider.create(data).subscribe(data => this.router.navigate(['/category']))
  }

  update(data) {
    this.categoryProvider.update(this.id, data).subscribe(data => this.router.navigate(['/category']))
  }

  checkRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  initForm() {
    this.data = this.formBuilder.group({
     description: ['', Validators.required],
    });
  }

  initFormValue(data) {
    this.data.controls['description'].setValue(data.description)
  }

  getTitle() {
    return this.getAction() + ' Category'
  }

  setNavbarTitle() {
    this.util.navbarTitle = this.getTitle();
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'});
    this.util.breadcrumbs.push({title: 'Categories', path: '/category'});
    this.util.breadcrumbs.push({title: this.getTitle(), class: 'active'});
  }

}
