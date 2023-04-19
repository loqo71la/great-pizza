import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import tinycolor from 'tinycolor2';

import { AuthService } from 'src/app/services/auth.service';
import { Guest } from 'src/app/shared/models/guest';
import { Menu } from 'src/app/shared/models/menu';
import { User } from 'src/app/shared/models/user';

const DefaultMenus = [
  { url: '/pizzas', name: 'Pizzas', selected: false },
  { url: '/toppings', name: 'Toppings', selected: false }
]
@Component({
  selector: 'gp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user?: User;
  menus: Menu[];
  guest?: Guest;

  constructor(private router: Router, private authService: AuthService) {
    this.menus = DefaultMenus;
  }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    const matcher = this.user?.username.match(/^guest_(.{6})$/)
    if (matcher) {
      const color = tinycolor(`#${matcher[1]}`);
      this.guest = { background: color.toHexString(), text: color.isDark() ? 'white' : 'black' }
    }
    this.loadMenu(this.router.url);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) this.loadMenu(val.urlAfterRedirects);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  signIn(): void {
    this.authService.signIn();
  }

  private loadMenu(url: string) {
    this.menus.forEach(menu => menu.selected = url.startsWith(menu.url))
  }
}
