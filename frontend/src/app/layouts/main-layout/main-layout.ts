import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar, SidebarItem } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  menuItems: SidebarItem[] = [
    { label: 'Início', icon: 'home', route: '/inicio', exact: true },
    { label: 'Salas', icon: 'room', route: '/salas', exact: true },
  ];

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }
}
