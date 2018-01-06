import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { SecureComponent } from './layout/secure';
import { PublicComponent } from './layout/public';

import { BreadcrumbComponent } from './layout/secure/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './layout/secure/navbar/navbar.component';
import { SidebarComponent } from './layout/secure/sidebar/sidebar.component';
import { FooterComponent } from './layout/secure/footer/footer.component';

import { DashboardComponent } from './secure/dashboard/dashboard.component';

import { LoginComponent } from './public/login/login.component';

import { Util } from './util';

import { AuthProvider } from './providers/auth/auth';
import { CategoryProvider } from './providers/category/category';
import { TagProvider } from './providers/tag/tag';
import { ProductProvider } from './providers/product/product';
import { ChecklistProvider } from './providers/checklist/checklist';

import { CategoryComponent } from './secure/category/category.component';
import { TagComponent } from './secure/tag/tag.component';
import { ProductComponent } from './secure/product/product.component';
import { ChecklistComponent } from './secure/checklist/checklist.component';
import { CategoryFormComponent } from './secure/category-form/category-form.component';
import { TagFormComponent } from './secure/tag-form/tag-form.component';
import { ProductFormComponent } from './secure/product-form/product-form.component';
import { ProductViewComponent } from './secure/product-view/product-view.component';
import { ChecklistFormComponent } from './secure/checklist-form/checklist-form.component';
import { ChecklistViewComponent } from './secure/checklist-view/checklist-view.component';

import { CategoryPipe } from './pipes/category/category.pipe';
import { TagPipe } from './pipes/tag/tag.pipe';
import { ProductPipe } from './pipes/product/product.pipe';
import { ChecklistPipe } from './pipes/checklist/checklist.pipe';

import { AuthGuard } from './../common/auth.guard';

import { DataTableModule } from "angular2-datatable";

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    BreadcrumbComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    CategoryComponent,
    TagComponent,
    ProductComponent,
    ChecklistComponent,
    CategoryFormComponent,
    TagFormComponent,
    ProductFormComponent,
    ProductViewComponent,
    ChecklistFormComponent,
    ChecklistViewComponent,
    CategoryPipe,
    TagPipe,
    ProductPipe,
    ChecklistPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    HttpModule,
  ],
  providers: [AuthGuard, AuthProvider, CategoryProvider, TagProvider, ProductProvider, ChecklistProvider, Util],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
