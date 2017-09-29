import { Routes } from '@angular/router';

import { AuthGuard } from './../../../common/auth.guard';

import { DashboardComponent } from './../../secure/dashboard/dashboard.component';
import { CategoryComponent } from './../../secure/category/category.component';
import { CategoryFormComponent } from './../../secure/category-form/category-form.component';
import { TagComponent } from './../../secure/tag/tag.component';
import { TagFormComponent } from './../../secure/tag-form/tag-form.component';
import { ProductComponent } from './../../secure/product/product.component';
import { ProductFormComponent } from './../../secure/product-form/product-form.component';
import { ProductViewComponent } from './../../secure/product-view/product-view.component';
import { ChecklistComponent } from './../../secure/checklist/checklist.component';
import { ChecklistFormComponent } from './../../secure/checklist-form/checklist-form.component';
import { ChecklistViewComponent } from './../../secure/checklist-view/checklist-view.component';

export const SECURE_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'category', canActivate: [AuthGuard], children: [
      { path: '', component: CategoryComponent },
      { path: 'create', component: CategoryFormComponent },
      { path: 'update', component: CategoryFormComponent }
    ] },
    { path: 'tag', canActivate: [AuthGuard], children: [
      { path: '', component: TagComponent },
      { path: 'create', component: TagFormComponent },
      { path: 'update', component: TagFormComponent }
    ] },
    { path: 'product', canActivate: [AuthGuard], children: [
      { path: '', component: ProductComponent },
      { path: 'view', component: ProductViewComponent },
      { path: 'create', component: ProductFormComponent },
      { path: 'update', component: ProductFormComponent },
    ] },
    { path: 'checklist', canActivate: [AuthGuard], children: [
      { path: '', component: ChecklistComponent },
      { path: 'view', component: ChecklistViewComponent },
      { path: 'create', component: ChecklistFormComponent },
      { path: 'update', component: ChecklistFormComponent },
    ] },
    { path: 'account', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: DashboardComponent, canActivate: [AuthGuard] },
];
