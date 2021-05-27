import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  apiUrl = environment.apiUrl;
  link = 'api/lesson';

  constructor(private http: HttpClient) {}

  getAllLessons(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getLessonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteLesson(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateLesson(lesson): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${lesson._id}`,
      lesson
    );
  }
  addContentIntoLesson(id, lesson): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/addContentIntoLesson/${id}`,
      lesson
    );
  }
  createLesson(lesson): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, lesson);
  }
}
