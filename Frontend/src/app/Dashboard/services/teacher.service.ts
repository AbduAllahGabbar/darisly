import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  apiUrl = environment.apiUrl;
  link = 'api/teacher';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllApprovedTeachers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/approved`);
  }
  getTeacherById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteTeacher(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateTeacher(teacher): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${teacher._id}`,
      teacher
    );
  }
  updateTeacherStatus(id, obj): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.link}/status/${id}`, obj);
  }
  updateTeacherPersonalImage(id, obj): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/personalImage/${id}`,
      obj
    );
  }
  createTeacher(teacher): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, teacher);
  }
  searchTeacher(teacher): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/search`, teacher);
  }
}
