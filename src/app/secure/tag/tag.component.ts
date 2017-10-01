import { Component, OnInit } from '@angular/core';

import { TagProvider } from './../../providers/tag/tag';

import { Util } from '../../util';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public data;
  public query = "";
  public rowsOnPage = 5;
  public sortBy = "description";
  public sortOrder = "asc";

  constructor(private tagProvider: TagProvider, private util: Util, private router: Router) {}

  ngOnInit() {
    this.setTitle();
    this.tagProvider.index().subscribe(data => { this.data = data; });
  }

  delete(id) {
    this.tagProvider.delete(id).subscribe(data => { this.tagProvider.index().subscribe(data => { this.data = data; }); })
  }

  setTitle() {
    this.util.navbarTitle = 'Tags';
  }

}
