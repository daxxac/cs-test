import { Routes } from '@angular/router';

export const routes: Routes = [
  { 'path': '', 'loadChildren': () => import('./modules/search.module').then(m => m.SearchModule) }
];
