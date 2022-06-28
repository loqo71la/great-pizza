import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MapperUtil } from '../shared/utils/mapper-util';
import { Pageable } from '../shared/models/pageable';
import { Pizza } from '../shared/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  getAll(page: number = 1, limit: number = environment.api.limit): Observable<Pageable<Pizza>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/pizza`, { params: { page, limit } })
      .pipe(map(page => ({ ...page, items: page.items.map(MapperUtil.toPizza) })));
  }

  getById(id: string): Observable<Pizza> {
    return this.http.get<any>(`${environment.api.url}/pizza/${id}`)
      .pipe(map(MapperUtil.toPizza));
  }

  add(pizza: Pizza): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza`, { ...pizza, toppings: undefined });
  }

  delete(pizzaId: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.api.url}/pizza/${pizzaId}`);
  }

  update(pizza: Pizza): Observable<Response> {
    return this.http.put<Response>(`${environment.api.url}/pizza/${pizza.id}`, { ...pizza, toppings: undefined });
  }

  assign(pizzaId: number, toppingIds: number[]): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza/${pizzaId}/topping/assign`, { ids: toppingIds });
  }
}
