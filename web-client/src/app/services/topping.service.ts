import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Topping } from '../shared/models/topping';
import { Pageable } from '../shared/models/pageable';
import { Response } from '../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor(private http: HttpClient) { }

  getAll(page: number = 1, limit: number = 15): Observable<Pageable<Topping>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/topping`, { params: { page, limit } })
      .pipe(map(page => {
        page.items = page.items.map(item => {
          const createdDate = item.createdDate ? new Date(item.createdDate) : null;
          const modifiedDate = item.modifiedDate ? new Date(item.modifiedDate) : null;
          return {
            id: item.id,
            name: item.name,
            type: item.type,
            price: item.price.toFixed(2),
            createdDate,
            modifiedDate
          }
        })
        return page;
      }));
  }

  add(topping: Topping): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/topping`, topping);
  }
}
