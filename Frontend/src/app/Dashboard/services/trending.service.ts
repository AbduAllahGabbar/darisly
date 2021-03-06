import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  apiUrl = environment.apiUrl;
  link = 'api/trendingCourse';

  constructor(private http: HttpClient) {}

  getAllTrending(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllTrendingWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getTrendingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteTrending(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateTrending(trending): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${trending._id}`,
      trending
    );
  }
  createTrending(trending): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, trending);
  }
}
