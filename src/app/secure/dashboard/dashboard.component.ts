import { Component, OnInit } from '@angular/core';

import { CategoryProvider } from '../../providers/category/category';
import { TagProvider } from '../../providers/tag/tag';
import { ProductProvider } from '../../providers/product/product';
import { ChecklistProvider } from '../../providers/checklist/checklist';

import { Util } from '../../util';

@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    data;
    countCategory: number;
    countTag: number;
    countProduct: number;
    countChecklist: number;

    constructor(private util: Util, private categoryProvider: CategoryProvider, private tagProvider: TagProvider, private productProvider: ProductProvider, private checklistProvider: ChecklistProvider) {}

    ngOnInit() {
      this.data = this.util.getUser()
      this.categoryProvider.index().subscribe(data => this.countCategory = data.length)
      this.tagProvider.index().subscribe(data => this.countTag = data.length)
      this.productProvider.index().subscribe(data => this.countProduct = data.length)
      this.checklistProvider.index().subscribe(data => this.countChecklist = data.length)
      this.setNavbarTitle()
      this.setBreadcrumbs()
    }

    setNavbarTitle() {
      this.util.navbarTitle = 'Dashboard';
    }

    setBreadcrumbs() {
      this.util.breadcrumbs = false;
    }
}
