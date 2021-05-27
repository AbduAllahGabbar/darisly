import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  apiUrl = environment.apiUrl;
  link = 'api/preview';

  constructor(private http: HttpClient) {}

  getAllPreviews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllPreviewsWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getPreviewById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deletePreview(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updatePreview(preview): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${preview._id}`,
      preview
    );
  }
  createPreview(preview): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, preview);
  }
}
