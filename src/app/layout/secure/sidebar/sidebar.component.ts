import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ti-dashboard' },
    { path: '/category', title: 'Categories',  icon: 'ti-list' },
    { path: '/tag', title: 'Tags',  icon: 'ti-bookmark' },
    { path: '/product', title: 'Products',  icon: 'ti-briefcase' },
    { path: '/checklist', title: 'Checklists',  icon: 'ti-files' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menu: any[];
    ngOnInit() {
        this.menu = ROUTES.filter(item => item);
    }
}
