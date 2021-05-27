import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiftCardService {
  apiUrl = environment.apiUrl;
  link = 'api/giftCard';

  constructor(private http: HttpClient) {}

  getAllGiftCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getGiftCardById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteGiftCard(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateGiftCard(giftCard): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${giftCard._id}`,
      giftCard
    );
  }
  createGiftCard(giftCard): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, giftCard);
  }
}
