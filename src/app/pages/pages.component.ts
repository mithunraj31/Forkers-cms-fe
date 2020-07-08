import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UserService } from '../services/user.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    const adminPages: string[] = [ $localize`:@@userManagement:`, $localize`:@@userListings:` ];

    console.log(this.userService.getLoggedUser());
    if (!this.userService.getLoggedUser().roles.includes('ROLE_ADMIN')) {
      this.menu = this.menu.filter(x => !adminPages.includes(x.title));
    }
  }
}
