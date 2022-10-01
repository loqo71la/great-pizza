import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Topping } from '../shared/models/topping';
import { Pageable } from '../shared/models/pageable';
import { Response } from '../shared/models/response';
import { environment } from 'src/environments/environment';
import { MapperUtil } from '../shared/utils/mapper-util';
import { User } from '../shared/models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  private user: User | null = null;

  constructor(private http: HttpClient, private authSerivce: AuthService) {
    this.authSerivce.getUserListener().subscribe(user => this.user = user);
  }

  getAll(page: number, limit: number, sort: string): Observable<Pageable<Topping>> {
    return this.http.get<Pageable<any>>(`${environment.api.url}/topping`, { params: { page, limit, sort } })
      .pipe(map(page => ({ ...page, items: page.items.map(MapperUtil.toTopping) })))
  }

  getById(id: string): Observable<Topping> {
    return this.http.get<any>(`${environment.api.url}/topping/${id}`)
      .pipe(map(MapperUtil.toTopping));
  }

  add(topping: Topping): Observable<Response> {
    return this.http.post<Response>(`${environment.api.url}/topping`, topping, this.loadHttpOptions());
  }

  update(topping: Topping): Observable<Response> {
    return this.http.put<Response>(`${environment.api.url}/topping/${topping.id}`, topping, this.loadHttpOptions());
  }

  delete(toppingId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api.url}/topping/${toppingId}`, this.loadHttpOptions());
  }

  private loadHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user?.accessToken}`
      })
    };
  }
}
