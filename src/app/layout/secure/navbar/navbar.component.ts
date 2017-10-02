import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../secure/sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthProvider } from '../../../providers/auth/auth';

import { Util } from '../../../util';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private dataUser: any[];

    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    constructor(private element: ElementRef, private authProvider: AuthProvider, private util: Util) {
        this.dataUser = this.util.getUser()
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    logout() {
      this.authProvider.logout();
    }

    getTitle(){
      return this.util.navbarTitle;
    }
}
