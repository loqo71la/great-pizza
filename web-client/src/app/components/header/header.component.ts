import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  user: User | null = null;
  menus: Menu[];

  constructor(private router: Router, private authService: AuthService) {
    this.menus = DefaultMenus;
  }

  ngOnInit() {
    this.authService.getUserListener().subscribe(user => this.user = user );
    this.loadMenu(this.router.url);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) this.loadMenu(val.urlAfterRedirects);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  private loadMenu(url: string) {
    this.menus.forEach(menu => menu.selected = url.startsWith(menu.url))
  }
}
