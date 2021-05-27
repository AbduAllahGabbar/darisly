import { Admin } from './admin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.apiUrl;
  url = 'api/adminAuth';
  constructor(private http: HttpClient) {}

  register(admin: Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.url}/register`, admin);
  }
  login(admin: Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.url}/login`, admin).pipe(
      map((loggedIn) => {
        // store loggedIn details and jwt token in local storage to keep loggedIn logged in between page refreshes
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        // this.currentUserSubject.next(loggedIn);
        return loggedIn;
      })
    );
  }
}
