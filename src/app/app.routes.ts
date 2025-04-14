import { Routes } from '@angular/router';
import { DishListPage } from './dish-list/dish-list.page';
import { DishDiscountCalculatorPage } from './dish-discount-calculator/dish-discount-calculator.page';
import { DishDetailsPage } from './dish-details/dish-details.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dishes' },
  {
    path: 'dishes',
    children: [
      { path: '', component: DishListPage, title: 'Plats' },
      { path: ':dishId', component: DishDetailsPage, title: 'Plat' },
    ],
  },
  {
    path: 'calculator',
    children: [
      { path: '', component: DishDiscountCalculatorPage, title: 'Calculateur de discounts' },
    ],
  },
];
