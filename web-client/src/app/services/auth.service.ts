import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { StorageUtil } from '../shared/utils/storage-util';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userListener = new BehaviorSubject<User | undefined>(undefined);

  get user(): BehaviorSubject<User | undefined> {
    return this.userListener;
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['id_token'] ?? StorageUtil.fromLocal('idToken');
      if (!token) return;

      try {
        const data: any = jwt_decode(token);
        const now = Date.now().valueOf() / 1000;
        if (now > data?.exp) StorageUtil.toLocal('idToken', null);
        else {
          this.userListener.next({ username: data.username, email: data.email, imageUrl: data.imageUrl });
          StorageUtil.toLocal('idToken', token);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  signOut(): void {
    StorageUtil.toLocal('idToken', null);
    this.userListener.next(undefined);
  }

  signIn(): void {
    window.location.href = `${environment.api.auth}&redirect_uri=${window.location.href}`
  }
}
