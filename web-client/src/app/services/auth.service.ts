import { Injectable } from '@angular/core';
import { Auth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as onSignOut, User as FBUser, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userListener = new BehaviorSubject<User | null>(null);
  private timer?: ReturnType<typeof setTimeout>;
  private user: Promise<User | null>;

  constructor(private auth: Auth) {
    this.user = this.loadUserPromise();
  }

  getUser(): Promise<User | null> {
    return this.user;
  }

  getUserListener(): BehaviorSubject<User | null> {
    return this.userListener;
  }

  signInWithGitHub(): Promise<void> {
    return signInWithPopup(this.auth, new GithubAuthProvider())
      .then(data => { this.user = new Promise((resolve, _) => resolve(this.loadUser(data.user))) });
  }

  signInWithGoogle(): Promise<void> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(data => { this.user = new Promise((resolve, _) => resolve(this.loadUser(data.user))) });
  }

  signOut(): Promise<void> {
    this.user = Promise.resolve(null);
    this.userListener.next(null);
    clearInterval(this.timer);
    return onSignOut(this.auth);
  }

  private loadUserPromise(forceRefresh: boolean = false): Promise<User | null> {
    return new Promise((resolve, _) => {
      onAuthStateChanged(this.auth, async (fbUser: FBUser | null) => {
        if (!fbUser) resolve(fbUser);
        else {
          const currentUser = await this.loadUser(fbUser, forceRefresh);
          resolve(currentUser);
        }
      });
    });
  }

  private async loadUser(fbUser: FBUser, forceRefresh: boolean = false) {
    const { token, expirationTime } = await fbUser.getIdTokenResult(forceRefresh);
    const currentUser = {
      accessToken: token,
      email: fbUser.email || '',
      image: fbUser.photoURL || '',
      name: fbUser.displayName || ''
    };
    this.userListener.next(currentUser);
    this.loadTimer(expirationTime);
    return currentUser;
  }

  private loadTimer(time: string): void {
    const expiration = (new Date(time)).getTime();
    const current = (new Date()).getTime();
    const delta = expiration - current - environment.api.expirationTime;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.user = this.loadUserPromise(true), (delta > 0) ? delta : 0);
  };
}
