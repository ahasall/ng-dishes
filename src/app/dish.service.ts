import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dish } from './dish';
import { Discount } from './discount';
import { map } from 'rxjs';

const API_URL = '/api/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private http = inject(HttpClient);

  getDishes(search: string | null) {
    let params = new HttpParams();
    if (search) {
      params = params.append('name_like', search);
    }
    return this.http.get<Dish[]>(API_URL, { params });
  }

  getDish(dishId: string) {
    return this.http.get<Dish>(`${API_URL}/${dishId}`);
  }

  deleteDish(dishId: string) {
    return this.http.delete<void>(`${API_URL}/${dishId}`);
  }

  likeDish(dishId: string) {
    return this.http.patch<Dish>(`${API_URL}/${dishId}`, {
      liked: true,
    });
  }

  unlikeDish(dishId: string) {
    return this.http.patch<Dish>(`${API_URL}/${dishId}`, {
      liked: false,
    });
  }

  getDishDiscount(dishId: string) {
    return this.http
      .get<Discount[]>(`/api/discounts?dishId=${dishId}`)
      .pipe(map((discounts) => discounts[0]));
  }
}
