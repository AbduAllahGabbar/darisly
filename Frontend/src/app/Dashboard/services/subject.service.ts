import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  apiUrl = environment.apiUrl;
  link = 'api/subject';

  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllSubjectsWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getSubjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteSubject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateSubject(subject): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${subject._id}`,
      subject
    );
  }
  createSubject(subject): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, subject);
  }
}
