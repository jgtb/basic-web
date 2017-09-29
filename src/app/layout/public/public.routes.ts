import { Routes } from '@angular/router';

import { AuthGuard } from './../../../common/auth.guard';

import { LoginComponent } from './../../public/login/login.component';

export const PUBLIC_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
];
