import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Pageable } from '../shared/models/pageable';
import { Pizza } from '../shared/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pageable<Pizza>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/pizza`)
      .pipe(map(page => {
        page.items = page.items.map(item => {
          const createdDate = item.createdDate ? new Date(item.createdDate): null;
          const modifiedDate = item.modifiedDate ? new Date(item.modifiedDate): null;
          return {
            id: item.id,
            name: item.name,
            size: item.size,
            type: item.type,
            price: item.price.toFixed(2),
            toppings: item.toppings,
            createdDate,
            modifiedDate
          }
        })
        return page;
      }));
  }

  add(pizza: Pizza): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/pizza`, pizza);
  }
}
