import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  apiUrl = environment.apiUrl;
  link = 'api/promoCode';

  constructor(private http: HttpClient) {}

  getAllPromoCodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getPromoCodeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deletePromoCode(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updatePromoCode(promoCode): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${promoCode._id}`,
      promoCode
    );
  }
  createPromoCode(promoCode): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, promoCode);
  }
}
