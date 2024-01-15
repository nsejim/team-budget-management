import { AuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  }
];
