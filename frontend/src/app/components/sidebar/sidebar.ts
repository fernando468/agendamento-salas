import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  items = input<SidebarItem[]>([
    { label: 'Início', icon: 'home', route: '/inicio', exact: true },
    { label: 'Salas', icon: 'room', route: '/salas', exact: true },
  ]);
  title = input<string>('Sistema de Reservas');

  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
