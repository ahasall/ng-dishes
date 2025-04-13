import { Routes } from '@angular/router';
import { DishListPage } from './dish-list/dish-list.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dishes' },
  {
    path: 'dishes',
    children: [{ path: '', component: DishListPage, title: 'Plats' }],
  },
];
