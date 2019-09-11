import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
     }, ];

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private _router: Subscription;

    @ViewChild('app-navbar-cmp') button: any;

    constructor(location: Location, private renderer: Renderer, private element: ElementRef, private router: Router,) {
        this.location = location;
        this.nativeElement = element.nativeElement;

    }


    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);

        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
       
          const $layer = document.getElementsByClassName('close-layer')[0];
          if ($layer) {
            $layer.remove();
          }
        });
    }
    onResize(event) {
      if ($(window).width() > 991) {
        return false;
      }
      return true;
    }

    getTitle() {
        let titlee: any = this.location.prepareExternalUrl(this.location.path());
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === "sub") {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }
    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }
}
