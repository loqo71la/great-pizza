import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MapperUtil } from '../shared/utils/mapper-util';
import { Pageable } from '../shared/models/pageable';
import { Pizza } from '../shared/models/pizza';
import { StorageUtil } from '../shared/utils/storage-util';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  getAll(page: number, limit: number, sort: string): Observable<Pageable<Pizza>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/pizza`, { params: { page, limit, sort } })
      .pipe(map(page => ({ ...page, items: page.items.map(MapperUtil.toPizza) })));
  }

  getById(id: string): Observable<Pizza> {
    return this.http.get<any>(`${environment.api.url}/pizza/${id}`)
      .pipe(map(MapperUtil.toPizza));
  }

  add(pizza: Pizza): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza`, { ...pizza, toppings: undefined }, this.loadHttpOptions());
  }

  delete(pizzaId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api.url}/pizza/${pizzaId}`, this.loadHttpOptions());
  }

  update(pizza: Pizza): Observable<Response> {
    return this.http.put<Response>(`${environment.api.url}/pizza/${pizza.id}`, { ...pizza, toppings: undefined }, this.loadHttpOptions());
  }

  assign(pizzaId: string, toppings: string[]): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza/${pizzaId}/assign`, { toppings }, this.loadHttpOptions());
  }

  qualify(pizzaId: string, level: number): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza/${pizzaId}/qualify`, { level }, this.loadHttpOptions());
  }

  private loadHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${StorageUtil.fromLocal('idToken')}`
      })
    };
  }
}
