import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from 'src/app/shared/models/menu';

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
  menus: Menu[];

  constructor(private router: Router) {
    this.menus = DefaultMenus;
  }

  ngOnInit() {
    this.loadMenu(this.router.url);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) this.loadMenu(val.url);
    });
  }

  private loadMenu(url: string) {
    this.menus.forEach(menu => menu.selected = url.startsWith(menu.url))
  }
}
