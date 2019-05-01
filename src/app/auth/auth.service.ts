import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);

  register(user: User): Observable<AuthResponse> {
      return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/signup`, user).pipe(
        tap(async (res: AuthResponse) => {

          if(res.user){
            await this.storage.set("ACCESS_TOKEN", res.accessToken);
            await this.storage.set("EXPIRES_IN", res.expiresIn);
            this.authSubject.next(true);
          }
        })
      );
  } // End of register

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if(res.user){
          await this.storage.set("ACCESS_TOKEN", res.accessToken);
          await this.storage.set("EXPIRES_IN", res.expiresIn);
          this.authSubject.next(true);
        }
      })
    );
  } // End login

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private storage: Storage) { }

}
