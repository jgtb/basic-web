import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { TagProvider } from './../../providers/tag/tag';

import { Util } from '../../util';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

  data: FormGroup;

  id: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private tagProvider: TagProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.checkRouteParams()
    this.setNavbarTitle()
    this.setBreadcrumbs()
    this.initForm()
    this.getTag()
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

  getTag() {
    this.tagProvider.view(this.id).subscribe(data => { this.initFormValue(data) })
  }

  create(data) {
    this.tagProvider.create(data).subscribe(data => this.router.navigate(['/tag']))
  }

  update(data) {
    this.tagProvider.update(this.id, data).subscribe(data => this.router.navigate(['/tag']))
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
    return this.getAction() + ' Tag'
  }

  setNavbarTitle() {
    this.util.navbarTitle = this.getTitle();
  }

  setBreadcrumbs() {
    this.util.breadcrumbs = [];
    this.util.breadcrumbs.push({title: 'Dashboard', path: '/dashboard'});
    this.util.breadcrumbs.push({title: 'Tags', path: '/tag'});
    this.util.breadcrumbs.push({title: this.getTitle(), class: 'active'});
  }

}
