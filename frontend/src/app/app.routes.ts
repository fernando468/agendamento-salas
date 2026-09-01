import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { CriarConta } from './pages/criar-conta/criar-conta';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Sala } from './pages/sala/sala';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'criar-conta', component: CriarConta },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'inicio', component: Inicio },
      { path: 'salas', component: Sala },
    ],
  },
];
