import { Component, OnInit } from '@angular/core';

import { ChecklistProvider } from './../../providers/checklist/checklist';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  dataChecklist: any = [];

  query: string = '';

  constructor(private checklistProvider: ChecklistProvider, private util: Util, private router: Router) {
  }

  ngOnInit() {
    this.setTitle();
    this.checklistProvider.index().subscribe(data => { this.dataChecklist = data; });
  }

  delete(id) {
    this.checklistProvider.delete(id).subscribe(data => { this.checklistProvider.index().subscribe(data => { this.dataChecklist = data; }); })
  }

  getListProducts(item) {
    let tags = item.reduce(function(prevVal, elem) {
      return prevVal + '<span class="badge">' + elem.product.description + '</span> ';
    }, '')

    return tags.substr(0, tags.length -2);
  }

  setTitle() {
    this.util.navbarTitle = 'Checklists';
  }

}
