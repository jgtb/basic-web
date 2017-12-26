import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { Util } from '../../../util'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router: Router, private util: Util) {}

  ngOnInit() {}

  goTo(breadcrumb) {
    this.router.navigate([breadcrumb.path], {queryParams: breadcrumb.params})
  }

}
