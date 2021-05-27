import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = environment.apiUrl;
  link = 'api/payment';

  constructor(private http: HttpClient) {}

  getPaymentKey(data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/key`, data);
  }
}
