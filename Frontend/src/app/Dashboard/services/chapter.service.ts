import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  apiUrl = environment.apiUrl;
  link = 'api/chapter';

  constructor(private http: HttpClient) {}

  getAllChapters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getChapterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteChapter(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateChapter(chapter): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${chapter._id}`,
      chapter
    );
  }
  createChapter(chapter): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, chapter);
  }
}
