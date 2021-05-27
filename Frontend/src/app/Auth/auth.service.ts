import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Admin } from './admin';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  apiUrl = environment.apiUrl;
  url = 'api/adminAuth';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('loggedIn'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  register(admin: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.url}/register`, admin);
  }
  login(admin: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.url}/login`, admin).pipe(
      map((loggedIn) => {
        // store loggedIn details and jwt token in local storage to keep loggedIn logged in between page refreshes
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        this.currentUserSubject.next(loggedIn);
        return loggedIn;
      })
    );
  }

  logout(): any {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedIn');
    this.currentUserSubject.next(null);
  }
}
