import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Topping } from '../shared/models/topping';
import { Pageable } from '../shared/models/pageable';
import { Response } from '../shared/models/response';
import { environment } from 'src/environments/environment';
import { MapperUtil } from '../shared/utils/mapper-util';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor(private http: HttpClient) { }

  getAll(page: number = 1, limit: number = environment.api.limit): Observable<Pageable<Topping>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/topping`, { params: { page, limit } })
      .pipe(map(page => ({ ...page, items: page.items.map(MapperUtil.toTopping) })))
  }

  getById(id: string): Observable<Topping> {
    return this.http.get<any>(`${environment.api.url}/topping/${id}`)
      .pipe(map(MapperUtil.toTopping));
  }

  add(topping: Topping): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/topping`, topping);
  }

  update(topping: Topping): Observable<Response> {
    return this.http.put<Response>(`${environment.api.url}/topping/${topping.id}`, topping);
  }

  delete(toppingId: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.api.url}/topping/${toppingId}`);
  }
}
